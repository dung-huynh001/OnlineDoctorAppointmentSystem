using WebAPI.Models;
using WebAPI.Responses;

namespace WebAPI.Interfaces.IService
{
    public interface IAuthService
    {
        Task<AuthResponse> LoginAsync(LoginModel request);
        Task<RegisterResponse> RegisterAsync(RegisterModel request);
        Task Logout();
    }
}
