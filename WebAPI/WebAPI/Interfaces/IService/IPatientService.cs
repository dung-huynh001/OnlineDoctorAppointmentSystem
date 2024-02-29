using WebAPI.DTOs;

namespace WebAPI.Interfaces.IService
{
    public interface IPatientService
    {
        Task<bool> Create(CreatePatientDto model);
    }
}
