using WebAPI.DTOs;
using WebAPI.Models;
using WebAPI.Responses;

namespace WebAPI.Interfaces.IService
{
    public interface IScheduleService
    {
        Task<ApiResponse> AddSchedule(AddScheduleDto model);
        Task<ApiResponse> UpdateSchedule(UpdateScheduleDto model);
        Task<GetSchedulesByDoctorIdDto> GetSchedulesByDoctorId(int doctorId);
        Task<DatatableResponse<DoctorCardDto>> GetDoctorList(ScheduleFilter filter); 
    }
}
