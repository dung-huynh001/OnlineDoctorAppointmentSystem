namespace WebAPI.DTOs
{
    public class CreateDoctorDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public IFormFile Avatar { get; set; }
        public string UserType { get; set; }

        public string? UserId { get; set; }
        public string FullName { get; set; }
        public string NationalId { get; set; }
        public int Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }

        public int DepartmentId { get; set; }
        public string Speciality { get; set; }
        public DateTime WorkingStartDate { get; set; }
        public DateTime WorkingEndDate { get; set; }
    }
}
