namespace WebAPI.DTOs
{
    public class MakeAppointmentDto
    {
        // Patient Information
        public int PatientId { get; set; }
        public string PatientName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public int Gender { get; set; }

        // Doctor Information
        public int DoctorId { get; set; }
        public string DoctorName { get; set; }
        public string? Speciality { get; set; }

        // Schedule Information
        public int ScheduleId { get; set; }

        //Appointment Information
        public int ConsultantType { get; set; }
        public int ModeOfConsultant { get; set; }
        public DateTime? AppointmentDate { get; set; }
        public TimeSpan? Time { get; set; }
        public string? AppointmentStatus { get; set; }
        public string? ExistingIllness { get; set; }
        public string? DrugAllergies { get; set; }
        public string? Note { get; set; }
    }
}
