using System;
using System.Collections.Generic;
using WebAPI.Domain.Common;

namespace WebAPI.Domain.Entities
{
    public partial class Patient : BaseEntity
    {
        public Patient()
        {
            Appointments = new HashSet<Appointment>();
        }

        public string UserId { get; set; }
        public string FullName { get; set; } = null!;
        public string NationalId { get; set; } = null!;
        public int Gender { get; set; }
        public string PhoneNumber { get; set; } = null!;
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; } = null!;

        public virtual AppUser User { get; set; } = null!;
        public virtual ICollection<Appointment> Appointments { get; set; }
    }
}
