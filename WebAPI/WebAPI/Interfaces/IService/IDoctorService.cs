using WebAPI.DTOs;

namespace WebAPI.Interfaces.IService
{
    public interface IDoctorService
    {
        Task<List<DoctorOnDutyDto>> GetDoctorListOnDuty(DateTime dateTime);
    }
}
