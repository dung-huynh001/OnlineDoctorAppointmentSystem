﻿using System;
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

        public string? Drug { get; set; } 
        public string? Note { get; set; }
        public string PatientName { get; set; } 
        public string? MedicationDays { get; set; } 
        public string? Quantity { get; set; } 
        public int Frequency { get; set; }
        public int? Unit { get; set; }

        public virtual ICollection<AppointmentPrescription> AppointmentPrescriptions { get; set; }
    }
}
