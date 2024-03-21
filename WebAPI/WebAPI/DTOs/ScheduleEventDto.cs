namespace WebAPI.DTOs
{
    public class ScheduleEventDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string WorkingDay { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public int ConsultantTime { get; set; }
        public string Type { get; set; }
    }
}
