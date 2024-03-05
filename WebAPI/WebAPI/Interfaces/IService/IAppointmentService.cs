namespace WebAPI.Interfaces.IService
{
    public interface IAppointmentService
    {
        Task GetAll();
        Task GetCompleted();
        Task GetWaiting();
        Task GetCancelled();
        Task GetOutOfDate();
    }
}
