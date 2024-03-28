namespace WebAPI.DTOs
{
    public class DoctorScheduleEventDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string? AvatarUrl { get; set; }
        public string Speciality { get; set; }
        public string WorkingDay { get; set; }
        /*public List<ScheduleEventDto> ScheduleEvents { get; set; }*/
    }

    public class DoctorScheduleEventInfoDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string? AvatarUrl { get; set; }
        public string Speciality { get; set; }
    }
}
