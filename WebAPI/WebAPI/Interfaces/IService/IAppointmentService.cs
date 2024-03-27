using WebAPI.DTOs;
using WebAPI.Models;
using WebAPI.Responses;

namespace WebAPI.Interfaces.IService
{
    public interface IAppointmentService
    {

        Task<GetAppointmentDetailDto> GetAppointmentDetail(int appointmentId);

        Task<DatatableResponse<GetAppointmentToDrawTableDto>> GetAppointments(string id, string userType, string type, DataTablesParameters parameters);


        Task<PatientDataToAppointment> GetPatientDataToAppointment(string currentUserId);

        Task<ApiResponse> MakeAppointment(MakeAppointmentDto model);

        Task<ApiResponse> CancelAppointment(int id);

        Task<ViewAppointmentDto> ViewAppointmentDetails(int id);

        Task<List<int>> LoadWidgets(string id, string userType);
        Task<List<RecentlyAppointmentDto>> GetRecentlyAppointment(string id);
        Task<List<UpcomingAppointmentDto>> GetUpcomingAppointment(string id);
    }
}
