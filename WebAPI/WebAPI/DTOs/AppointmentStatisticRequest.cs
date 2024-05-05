namespace WebAPI.DTOs
{
    public class AppointmentStatisticRequest
    {
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public string RenderBy { get; set; } = "today";
    }
}
