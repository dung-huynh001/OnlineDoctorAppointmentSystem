namespace WebAPI.DTOs
{
    public class CreateScheduleDto
    {
        public int DoctorId { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public string ScheduleDate { get; set; }
        public string nStartTime { get; set; }
        public string nEndTime { get; set; }
        public string aStartTime { get; set; }
        public string aEndTime { get; set; }
        public string mStartTime { get; set; }
        public string mEndTime { get; set; }
        public int ConsultantTime { get; set; }
    }
}
