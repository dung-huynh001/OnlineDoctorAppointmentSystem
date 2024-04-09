namespace WebAPI.Models
{
    public class DoctorModel
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string NationalId { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PhoneNumber { get; set; }
        public string Speciality { get; set; }
        public string WorkingStartDate { get; set; }
        public string WorkingEndDate { get; set;}
    }
}
