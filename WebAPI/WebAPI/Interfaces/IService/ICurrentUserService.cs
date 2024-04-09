using WebAPI.Domain.Common;
using WebAPI.Domain.Entities;

namespace WebAPI.Interfaces.IService
{
    public interface ICurrentUserService
    {
        Task<string> GetFullName(string id, string userType);
        Task<Doctor> GetDoctorInfo(string userId);
        Task<Patient> GetPatientInfo(string userId);
    }
}
