namespace WebAPI.DTOs
{
    /*public class EventDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string? AvatarUrl { get; set; }
        public string Speciality { get; set; }
        public string WorkingDay { get; set; }
    }*/

    public class EventDto
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int DoctorId { get; set; }
    }
}
