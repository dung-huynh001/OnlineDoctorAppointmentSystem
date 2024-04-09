using System;
using System.Collections.Generic;
using WebAPI.Domain.Common;

namespace WebAPI.Domain.Entities
{
    public partial class Appointment : BaseEntity
    {
        public Appointment()
        {
            AppointmentPrescriptions = new HashSet<AppointmentPrescription>();
        }

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

        public virtual Patient Patient { get; set; } = null!;
        public virtual Doctor Doctor { get; set; } = null!;
        public virtual Schedule Schedule { get; set; } = null!;
        public virtual ICollection<AppointmentPrescription> AppointmentPrescriptions { get; set; }
    }
}
