namespace WebAPI.DTOs
{
    public class PatientTableDto
    {
        public int Id { get; set; }
        public string? FullName { get; set; }
        public string? NationalId { get; set; }
        public string Gender { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? Address { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsDeleted { get; set; }
    }
}
