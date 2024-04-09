using System.Globalization;

namespace WebAPI.Models
{
    public class AppointmentModel
    {
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public int ScheduleId { get; set; }
        public int ConsultantType { get; set; }
        public int ModeOfConsultant { get; set; }
        public DateTime DateOfConsultant { get; set; }
        public DateTime AppointmentDate {  get; set; }
        public string? AppointmentStatus { get; set; }
        public string? ClosedBy { get; set; }
        public DateTime ClosedDate { get; set; }
        public string? Symtoms { get; set; }
        public string? Existingillness { get; set; }
        public string? Druggallergies { get; set; }
        public string? Note {  get; set; }
        public string? CaseNote { get; set; }
        public string? Diagnosis { get; set; }
        public string? AdviceToPatient { get; set; }
        public string? LabTests { get; set; }
    }
}
