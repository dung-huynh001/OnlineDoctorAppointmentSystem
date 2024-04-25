using WebAPI.Domain.Common;
using WebAPI.Domain.Entities;

namespace WebAPI.Interfaces.IService
{
    public interface ICurrentUserService
    {
        string GetCurrentUserId();
        Task<string> GetFullName(string id, string userType);
        string GetFullName(string id);
        Task<Doctor> GetDoctorInfo(string userId);
        Task<Patient> GetPatientInfo(string userId);
    }
}
