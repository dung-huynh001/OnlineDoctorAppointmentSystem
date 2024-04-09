using WebAPI.Models;

namespace WebAPI.Interfaces.IService
{
    public interface IGenerateOtpService
    {
        Task<OTP> GenerateOtp(string id);
        Task<bool> ValidOtpCode(string id, OTP otp);
    }
}
