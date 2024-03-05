using WebAPI.Domain.Common;
using WebAPI.Domain.Entities;

namespace WebAPI.Interfaces.IService
{
    public interface IUserService
    {
        Task<string> GetFullName(string id, string UserType);
        Task<Doctor> GetDoctorInfo(string userId);
        Task<Patient> GetPatientInfo(string userId);
    }
}
