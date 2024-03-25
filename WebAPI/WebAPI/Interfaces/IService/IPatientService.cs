using WebAPI.DTOs;
using WebAPI.Models;
using WebAPI.Responses;

namespace WebAPI.Interfaces.IService
{
    public interface IPatientService
    {
        Task<bool> Create(CreatePatientDto model);
        Task<PatientDetailsDto> GetPatientDetails(string id);
        Task<ApiResponse> UpdatePatientInfo(UpdatePatientDetailsDto model);
        Task<OTP> SendActivateMail(string id, string email);
        Task<bool> ValidOTP(string id, OTP otp);
    }
}
