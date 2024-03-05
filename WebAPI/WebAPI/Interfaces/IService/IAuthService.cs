using WebAPI.DTOs;
using WebAPI.Models;
using WebAPI.Responses;

namespace WebAPI.Interfaces.IService
{
    public interface IAuthService
    {
        Task<AuthResponse> LoginAsync(LoginModel request);
        Task<RegisterResponse> RegisterAsync(RegisterModel request);
        Task<bool> DeleteUser(string id);
        Task<RegisterResponse> CreateDoctorAccount(RegisterModel model, CreateDoctorDto doctor);
        Task Logout();
    }
}
