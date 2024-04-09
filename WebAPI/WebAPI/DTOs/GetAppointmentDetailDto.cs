namespace WebAPI.DTOs
{
    public class GetAppointmentDetailDto
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
        public string Speciality { get; set; }


        //Appointment Information
        public int Id { get; set; }
        public int ConsultantType { get; set; }
        public int ModeOfConsultant { get; set; }
        public DateTime DateOfConsultation { get; set; }
        public DateTime? AppointmentDate { get; set; }
        public string AppoimentStatus { get; set; } = null!;
        public DateTime? ClosedDate { get; set; }
        public string? ClosedBy { get; set; }
        public string? Symtoms { get; set; }
        public string? Existingillness { get; set; }
        public string? Drugallergies { get; set; }
        public string? Note { get; set; }
        public string? CaseNote { get; set; }
        public string? Diagnosis { get; set; }
        public string? AdviceToPatient { get; set; }
        public string? LabTests { get; set; }
    }
}
