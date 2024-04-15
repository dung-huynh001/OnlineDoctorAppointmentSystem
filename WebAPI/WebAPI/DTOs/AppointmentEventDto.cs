namespace WebAPI.DTOs
{
    public class AppointmentEventDto
    {
        public int Id { get; set; }
        public string? Subject { get; set; }
        public DateTime AppointmentDate { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int DoctorId { get; set; }
        public int PatientId { get; set; }
        public string? ExistingIllness { get; set; }
        public string? Allergies { get; set; }
        public string? Notes { get; set; }
        public EventType? EventType { get; set; }
        public int ScheduleId { get; set; }
    }
}

public class EventType
{
    public int Id { get; set; }
    public string FullName { get; set; }
}
