namespace WebAPI.Models
{
    public class SchedulesOfDoctor
    {
        public int Id { get; set; }
        public DateTime WorkingDay { get; set; }
        public TimeSpan ShiftTime { get; set; }
        public TimeSpan BreakTime { get; set; }
        public int ConsultantTime { get; set; }
    }
}
