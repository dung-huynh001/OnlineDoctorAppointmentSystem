namespace WebAPI.DTOs
{
    public class RecentlyAppointmentDto
    {
        public int Id { get; set; }
        public string DoctorName { get; set; }
        public string Speciality { get; set; }
        public string AvatarUrl { get; set; }
        public string AppointmentDate { get; set; }
    }
}
