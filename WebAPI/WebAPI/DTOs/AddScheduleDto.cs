namespace WebAPI.DTOs
{
    public class AddScheduleDto
    {
        public int DoctorId { get; set; }
        public DateTime WorkingDay { get; set; }
        public TimeSpan ShiftTime { get; set; }
        public TimeSpan BreakTime { get; set; }
        public int ConsultantTime { get; set; }
    }
}
