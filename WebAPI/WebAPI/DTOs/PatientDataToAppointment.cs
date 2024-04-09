namespace WebAPI.DTOs
{
    public class PatientDataToAppointment
    {
        public int PatientId { get; set; }
        public string PatientName { get; set;}
        public int Gender { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
    }
}
