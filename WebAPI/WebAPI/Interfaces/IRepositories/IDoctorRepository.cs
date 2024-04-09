using WebAPI.DTOs;

namespace WebAPI.Interfaces.IRepositories
{
    public interface IDoctorRepository
    {
        List<DoctorOnDutyDto> GetDoctorListOnDuty(DateTime dateTime);
    }
}
