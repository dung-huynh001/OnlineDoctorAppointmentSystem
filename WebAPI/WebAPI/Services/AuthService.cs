using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NETCore.MailKit.Core;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI.Domain.Entities;
using WebAPI.Domain.Enums;
using WebAPI.DTOs;
using WebAPI.Exceptions;
using WebAPI.Interfaces;
using WebAPI.Interfaces.IService;
using WebAPI.Models;
using WebAPI.Responses;

namespace WebAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IPatientService _patientService;
        private readonly ICurrentUserService _userService;
        private readonly IEmailService _mailService;

        public AuthService(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            RoleManager<AppRole> roleManager,
            IConfiguration configuration,
            IPatientService patientService,
            ICurrentUserService userService,
            IEmailService emailService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _patientService = patientService;
            this._userService = userService;
            this._mailService = emailService;
        }

        public async Task<AuthResponse> LoginAsync(LoginModel request)
        {

            var result = await _signInManager.PasswordSignInAsync(request.Username, request.Password, false, false);
            if (!result.Succeeded)
            {
                throw new BadRequestException("Username or password is incorrect!");
            }

            var user = await _userManager.FindByNameAsync(request.Username);

            var userType = user.UserType;

            await _signInManager.SignInAsync(user, true);

            var userRoles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
            };

            foreach (var role in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role));
            }

            var authKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.UtcNow.AddHours(2),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authKey,
                    SecurityAlgorithms.HmacSha512Signature)
            );

            var fullName = await _userService.GetFullName(user.Id, userType);

            return new AuthResponse
            {
                Id = user.Id,
                UserName = user.UserName,
                FullName = fullName,
                UserType = userType,
                AvatarUrl = user.AvatarUrl,
                Status = user.Status,
                Token = new JwtSecurityTokenHandler().WriteToken(token)
            };
        }

        public async Task<RegisterResponse> RegisterAsync(RegisterModel request)
        {
            var userExists = await _userManager.FindByNameAsync(request.Username);
            if (userExists != null)
            {
                throw new Exception("Username already taken");
            }

            var userType = request.UserType!.Trim().ToLower();

            var user = new AppUser
            {
                UserName = request.Username,
                Email = request.Email,
                UserType = userType,
                AvatarUrl = request.AvatarUrl,
                Status = userType == "patient" ? StatusAccount.NotActivate : StatusAccount.Activated
            };

            var result = await _userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                throw new Exception(result.Errors.ToList()[0].Description);
            }

            string role = request.UserType!.ToString();

            if (!await _roleManager.RoleExistsAsync(role))
            {
                await _roleManager.CreateAsync(new AppRole(role));
            }

            if (await _roleManager.RoleExistsAsync(role))
            {
                await _userManager.AddToRoleAsync(user, role);
            }
            // Create a new patient corresponding to the newly created user
            switch (user.UserType)
            {
                case "patient":
                    if(!await _patientService.Create(new CreatePatientDto { FullName = user.UserName, UserId = user.Id }))
                    {
                        await DeleteUserAsync(user.Id);
                        throw new Exception("Patient account registration failed");
                    }
                    break;
                case "doctor":
                    break;
                default:
                    await DeleteUserAsync(user.Id);
                    throw new Exception("Can only sign up for a patient or doctor account");
            }

            return new RegisterResponse
            {
                UserId = user.Id
            };
        }

        public async Task<bool> DeleteUserAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if(user == null)
            {
                throw new NotFoundException("user", id);
            }

            await _userManager.DeleteAsync(user);
            return true;
        }

        public async Task Logout()
        {
            await _signInManager.SignOutAsync();
        }

        public async Task<bool> UpdateEmailAndAvatarUrlAsync(string id, string email, string avatarUrl)
        {
            var user = await _userManager.FindByIdAsync(id);
            if(user == null)
            {
                throw new NotFoundException("user", id);
            }
            user.Email = email;
            user.AvatarUrl = avatarUrl;
            user.UserName = user.UserName.Trim();
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return true;
            }
            return false;
        }

        public async Task<ApiResponse> ChangePassword(ChangePasswordModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user != null)
            {
                var loginSuccess = await _signInManager.PasswordSignInAsync(model.Username, model.CurrentPassword, false, false);
                if (loginSuccess.Succeeded)
                {
                    await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
                    return new ApiResponse
                    {
                        IsSuccess = true,
                        Message = "Changed password successfully"
                    };
                }

                return new ApiResponse
                {
                    IsSuccess = false,
                    Message = "Change password failed"
                };
            }
            else
            {
                return new ApiResponse
                {
                    IsSuccess = false,
                    Message = "Username is incorrect"
                };
            }
        }

        public async Task<ApiResponse> ForgetPassword(ForgetPasswordModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if(user != null)
            {
                if(user.Email.Trim() == model.Email)
                {
                    var token = await _userManager.GeneratePasswordResetTokenAsync(user);

                    await _userManager.ChangePasswordAsync(user, "", "");
                    return new ApiResponse
                    {
                        IsSuccess = true,
                        Message = "New password has been sent in registration email"
                    };
                }

                return new ApiResponse
                {
                    IsSuccess = false,
                    Message = "Registered email is incorrect"
                };
            }
            else
            {
                return new ApiResponse
                {
                    IsSuccess = false,
                    Message = "Username is incorrect"
                };
            }

            
        }
    }
}
