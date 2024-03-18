namespace WebAPI.DTOs
{
    public class DoctorDetailsDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string? FullName { get; set; }
        public string? NationalId { get; set; }
        public string? Email { get; set; }
        public string? DateOfBirth { get; set; }
        public string? WorkingStartDate { get; set; }
        public string? WorkingEndDate { get; set; }
        public int Gender { get; set; }
        public int DepartmentId { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? Speciality { get; set; }
        public string? AvatarUrl { get; set; }
        public string? CreatedDate { get; set; }
        public string? UpdatedDate { get; set;}
    }

    public class DoctorPersonalInfo
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string? FullName { get; set; }
        public string? NationalId { get; set; }
        public string? Email { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Gender { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public IFormFile? Avatar { get; set; }
        public string? AvatarUrl { get; set; }
    }

    public class WorkInfoDto
    {
        public int Id { get; set; }
        public string? Speciality { get; set; }
        public int DepartmentId { get; set; }
        public DateTime WorkingEndDate { get; set; }
        public DateTime WorkingStartDate { get; set; }

    }
}
