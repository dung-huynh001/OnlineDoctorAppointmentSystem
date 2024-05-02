namespace WebAPI.DTOs
{
    public class PatientResourceDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string AvatarUrl { get; set; } = "Uploads/Images/default-user.jpg";
    }
}
