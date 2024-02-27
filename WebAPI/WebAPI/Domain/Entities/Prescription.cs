using System;
using System.Collections.Generic;
using WebAPI.Domain.Common;

namespace WebAPI.Domain.Entities
{
    public partial class Prescription : BaseEntity
    {
        public Prescription()
        {
            AppointmentPrescriptions = new HashSet<AppointmentPrescription>();
        }

        public string Drug { get; set; } = null!;
        public string? Note { get; set; }
        public string PatientName { get; set; } = null!;
        public string MedicationDays { get; set; } = null!;
        public string Quantity { get; set; } = null!;
        public int Frequency { get; set; }
        public int? Unit { get; set; }

        public virtual ICollection<AppointmentPrescription> AppointmentPrescriptions { get; set; }
    }
}
