using WebAPI.DTOs;
using WebAPI.Models;
using WebAPI.Responses;

namespace WebAPI.Interfaces.IService
{
    public interface IScheduleService
    {
        Task<List<ScheduleShiftDto>> GetScheduleByDate(int doctorId, DateTime date);
        Task<List<ScheduleShiftDto>> GetScheduleByDateAndUserId(string doctorId, DateTime date);
        Task<ApiResponse> AddSchedule(CreateScheduleDto model);
        Task<ApiResponse> UpdateSchedule(UpdateScheduleDto model);
        Task<List<ScheduleEventDto>> GetScheduleEventsByDoctor(int doctorId);
        Task<DatatableResponse<DoctorCardDto>> GetDoctors(ScheduleFilter filter);
        Task<List<EventDto>> GetAllDoctorSchedules(EJ2Params param);
        Task<List<ScheduleShiftDto>> GetScheduleShiftsByDate(int doctorId, DateTime date);

        Task<List<DoctorResourceDto>> GetDoctors();
        Task<List<PatientResourceDto>> GetAppointmentPatients(string doctorId);
    }
}
