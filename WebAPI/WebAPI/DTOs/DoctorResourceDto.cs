namespace WebAPI.DTOs
{
    public class DoctorResourceDto
    {
        public int Id { get; set; }
        public int DepartmentId { get; set; }
        public string FullName { get; set; }
        public string AvatarUrl { get; set; }
        public string Speciality { get; set; }
    }
}
