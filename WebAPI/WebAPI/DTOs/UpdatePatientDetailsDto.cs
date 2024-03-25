namespace WebAPI.DTOs
{
    public class UpdatePatientDetailsDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Gender { get; set; }
        public string NationalId { get; set; }
        public string DateOfBirth { get; set; }
        public IFormFile? Avatar { get; set; }
        public string? AvatarUrl { get; set; }
    }
}
