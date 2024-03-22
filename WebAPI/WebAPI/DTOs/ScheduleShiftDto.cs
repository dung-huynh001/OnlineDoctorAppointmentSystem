namespace WebAPI.DTOs
{
    public class ScheduleShiftDto
    {
        public string ShiftName { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public string Description { get; set; }
        public int Appt { get; set; }
    }
}
