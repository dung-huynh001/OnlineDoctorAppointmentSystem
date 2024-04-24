using WebAPI.Domain.Entities;
using WebAPI.DTOs;
using WebAPI.Models;
using WebAPI.Responses;

namespace WebAPI.Interfaces.IService
{
    public interface IAuthService
    {
        Task<AuthResponse> LoginAsync(LoginModel request);
        Task<RegisterResponse> RegisterAsync(RegisterModel request);
        Task<bool> DeleteUserAsync(string id);
        Task<bool> UpdateEmailAndAvatarUrlAsync(string id, string email, string avatarUrl);
        Task<ApiResponse> ForgetPassword(ForgetPasswordModel model);
        Task<ApiResponse> ChangePassword(ChangePasswordModel model);
        Task Logout();
    }
}
