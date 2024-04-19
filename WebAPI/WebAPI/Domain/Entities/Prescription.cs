using System;
using System.Collections.Generic;
using WebAPI.Domain.Common;

namespace WebAPI.Domain.Entities
{
    public partial class Prescription : BaseEntity
    {
/*        public Prescription()
        {
            AppointmentPrescriptions = new HashSet<AppointmentPrescription>();
        }*/

        public string Drug { get; set; } 
        public string? Note { get; set; }
        public int MedicationDays { get; set; } 
        public int Quantity { get; set; } 
        public string Frequency { get; set; }
        public string Unit { get; set; }
        public int AppointmentId { get; set; }
        public virtual Appointment Appointment { get; set; }

        /*public virtual ICollection<AppointmentPrescription> AppointmentPrescriptions { get; set; }*/
    }
}
