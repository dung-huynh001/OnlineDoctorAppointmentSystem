using System;
using System.Collections.Generic;
using WebAPI.Domain.Common;

namespace WebAPI.Domain.Entities
{
    public partial class Schedule : BaseEntity
    {
        public Schedule()
        {
            Appointments = new HashSet<Appointment>();
        }

        public int DoctorId { get; set; }
        public DateTime WorkingDay { get; set; }
        public TimeSpan ShiftTime { get; set; }
        public TimeSpan BreakTime { get; set; }
        public int ConsultantTime { get; set; }

        public virtual Doctor Doctor { get; set; } = null!;
        public virtual ICollection<Appointment> Appointments { get; set; }
    }
}
