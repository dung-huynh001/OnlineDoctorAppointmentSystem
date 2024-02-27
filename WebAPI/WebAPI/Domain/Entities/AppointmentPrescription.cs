using System;
using System.Collections.Generic;

namespace WebAPI.Domain.Entities
{
    public partial class AppointmentPrescription
    {
        public int PrecriptionId { get; set; }
        public int AppointmentId { get; set; }
        public string? Note { get; set; }

        public virtual Appointment Appointment { get; set; } = null!;
        public virtual Prescription Precription { get; set; } = null!;
    }
}
