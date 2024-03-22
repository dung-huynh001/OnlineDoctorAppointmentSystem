using WebAPI.DTOs;
using WebAPI.Models;
using WebAPI.Responses;

namespace WebAPI.Interfaces.IService
{
    public interface IScheduleService
    {
        Task<List<ScheduleShiftDto>> GetScheduleByDate(int doctorId, DateTime date);
        Task<ApiResponse> AddSchedule(CreateScheduleDto model);
        Task<ApiResponse> UpdateSchedule(UpdateScheduleDto model);
        Task<List<ScheduleEventDto>> GetScheduleEventsByDoctor(int doctorId);
        Task<DatatableResponse<DoctorCardDto>> GetDoctorList(ScheduleFilter filter); 
    }
}
