namespace WebAPI.DTOs
{
    public class UpcomingAppointmentDto
    {
        public int Id { get; set; }
        public string DoctorName { get; set; }
        public string PatientName { get; set; }
        public string PatientGender { get; set; }
        public string Speciality { get; set; }
        public string AppointmentDate { get; set; }
        public string DateOfConsultation { get; set; }
        public string Status { get; set; }
        public string CreatedDate { get; set; }
    }
}
