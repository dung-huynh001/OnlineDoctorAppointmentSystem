using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Responses;
using WebAPI.Services;
using WebAPI.Validators;
using WebAPI.Exceptions;
using WebAPI.Interfaces.IService;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IAuthService authService, ILogger<AuthController> logger)
        {
            _authService = authService;
            _logger = logger;
        }

        [HttpPost("login")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<AuthResponse>> Login(LoginModel model)
        {
            var validator = new LoginModelValidator();
            var validatorResult = await validator.ValidateAsync(model);
            if (!validatorResult.IsValid)
            {
                throw new ValidationException(validatorResult);
            }
            var res = await _authService.LoginAsync(model);

            return Ok(res);
        }

        [HttpPost("register")]
        public async Task<ActionResult<RegisterResponse>> Register(RegisterModel model)
        {
            var validator = new RegisterModelValidator();
            var validatorResult = await validator.ValidateAsync(model);
            if (!validatorResult.IsValid)
            {
                throw new ValidationException(validatorResult);
            }
            return Ok(await _authService.RegisterAsync(model));
        }

        [HttpPost("forget-password")]
        public async Task<ActionResult> ForgetPassword([FromForm]ForgetPasswordModel model)
        {
            return Ok(await _authService.ForgetPassword(model));
        }

        [HttpPost("change-password")]
        public async Task<ActionResult> ChangePassword([FromForm] ChangePasswordModel model)
        {
            return Ok(await _authService.ChangePassword(model));
        }
    }
}
