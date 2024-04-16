namespace WebAPI.DTOs
{
    public class NewBookingDto
    {
        public int Id { get; set; }
        public string PatientName { get; set; }
        public string Gender { get; set; }
        public string AvatarUrl { get; set; } = "Uploads/Images/default-user.jpg";
        public DateTime DateOfBirth { get; set; }
        public DateTime AppointmentDate { get; set; }
    }
}
