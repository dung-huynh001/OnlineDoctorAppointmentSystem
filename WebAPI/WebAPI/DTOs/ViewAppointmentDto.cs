using WebAPI.Domain.Entities;

namespace WebAPI.DTOs
{
    public class ViewAppointmentDto
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public int ScheduleId { get; set; }
        public int ConsultantType { get; set; }
        public int ModeOfConsultant { get; set; }
        public DateTime DateOfConsultation { get; set; }
        public DateTime? AppointmentDate { get; set; }
        public string AppointmentStatus { get; set; } = null!;
        public DateTime? ClosedDate { get; set; }
        public string? ClosedBy { get; set; }
        public string? Symtoms { get; set; }
        public string? ExistingIllness { get; set; }
        public string? DrugAllergies { get; set; }
        public string? Note { get; set; }
        public string? CaseNote { get; set; }
        public string? Diagnosis { get; set; }
        public string? AdviceToPatient { get; set; }
        public string? LabTests { get; set; }

        public string DoctorName { get; set; } = string.Empty;
        public string Speciality { get; set; } = string.Empty;
        public string DoctorPhoneNumber { get; set; } = string.Empty;
        public string DoctorGender { get; set; } = string.Empty;
        public string DoctorEmail { get; set; } = string.Empty;
        public string DoctorAvatarUrl { get; set; } = string.Empty;
                
        public string PatientName { get; set; } = string.Empty;
        public DateTime PatientBirthDay { get; set; }
        public string PatientPhoneNumber { get; set; } = string.Empty;
        public string PatientGender { get; set; } = string.Empty;
        public string PatientEmail { get; set; } = string.Empty;
        public string PatientAddress { get; set; } = string.Empty;
    }
}
