using WebAPI.DTOs;

namespace WebAPI.Interfaces.IService
{
    public interface IStatisticService
    {
        Task<List<WidgetDto>> StatisticAppointmentWidgets(string userId, string userType);
        Task<List<WidgetDto>> StatisticResourceWidgets();
        Task<List<GenderStatisticDto>> StatisticGender();
        Task<AppointmentStatisticResponse> StatisticAppointment(AppointmentStatisticRequest request);
    }
}
