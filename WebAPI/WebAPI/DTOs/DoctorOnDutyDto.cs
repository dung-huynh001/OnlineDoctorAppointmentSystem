using WebAPI.Domain.Entities;

namespace WebAPI.DTOs
{
    public class DoctorOnDutyDto
    {
        public int DoctorId { get; set; }
        public string? FullName { get; set; }
        public string? Speciality { get; set; }
        public int ScheduleId { get; set; }
    }
}
