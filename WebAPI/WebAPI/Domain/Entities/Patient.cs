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

        public string UserId { get; set; } = null!;
        public string? FullName { get; set; }
        public string? NationalId { get; set; }
        public int Gender { get; set; }
        public string? PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? Address { get; set; }

        public virtual AppUser User { get; set; }
        public virtual ICollection<Appointment> Appointments { get; set; }
    }
}
