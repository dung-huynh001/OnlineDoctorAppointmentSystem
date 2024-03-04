using WebAPI.Models;

namespace WebAPI.DTOs
{
    public class GetSchedulesByDoctorIdDto
    {
        public int DoctorId { get; set; }
        public string DoctorName { get; set;}
        public string Email { get; set;}
        public string PhoneNumber { get; set;}
        public int Gender { get; set;}
        public string Speciality { get; set;}
        public List<SchedulesOfDoctor> Schedules { get; set; }
    }
}
