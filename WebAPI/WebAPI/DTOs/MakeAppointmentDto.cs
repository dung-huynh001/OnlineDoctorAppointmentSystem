using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTOs
{
    public class MakeAppointmentDto
    {
        // Patient Information
        [Required]
        public int PatientId { get; set; }
        public string PatientName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        [Required]
        public int Gender { get; set; }

        // Doctor Information
        [Required]
        public int DoctorId { get; set; }
        public string DoctorName { get; set; }
        public string? Speciality { get; set; }

        // Schedule Information
        [Required]
        public int ScheduleId { get; set; }

        //Appointment Information
        [Required]
        public int ConsultantType { get; set; }
        [Required]
        public int ModeOfConsultant { get; set; }
        [Required]
        public DateTime AppointmentDate { get; set; }
        [Required]
        public TimeSpan Time { get; set; }
        [Required]
        public string AppointmentStatus { get; set; }
        public DateTime DateOfConsultation { get; set; }
        public string? ExistingIllness { get; set; }
        public string? DrugAllergies { get; set; }
        public string? Note { get; set; }
    }
}
