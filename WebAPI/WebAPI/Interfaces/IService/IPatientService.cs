using WebAPI.DTOs;
using WebAPI.Models;
using WebAPI.Responses;

namespace WebAPI.Interfaces.IService
{
    public interface IPatientService
    {
        Task<DatatableResponse<PatientTableDto>> GetAll(DataTablesParameters parameters);
        Task<bool> Create(CreatePatientDto model);
        Task<ApiResponse> Delete(int id);
        Task<PatientDetailsDto> GetPatientDetailByUserId(string id);
        Task<PatientDetailsDto> GetPatientDetailByPatientId(int id);
        Task<UpdatePatientDetailDto?> UpdatePatient(UpdatePatientDetailDto model);
        Task<OTP> SendActivateMail(string id, string email);
        Task<ApiResponse> ValidOTP(string id, OTP otp);
    }
}
