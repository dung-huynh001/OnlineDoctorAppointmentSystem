using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace WebAPI.Domain.Entities
{
    public partial class AppUser : IdentityUser
    {
        public AppUser()
        {
            Doctors = new HashSet<Doctor>();
            Patients = new HashSet<Patient>();
        }

        public string UserType { get; set; } = null!;
        public string? AvatarUrl { get; set; }
        public int? Passwordrecoveryque1 { get; set; }
        public int? Passwordrecoveryque2 { get; set; }
        public int? Passwordrecoveryque3 { get; set; }
        public string? Passwordrecoveryans1 { get; set; }
        public string? Passwordrecoveryans2 { get; set; }
        public string? Passwordrecoveryans3 { get; set; }
        public bool Status { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool DeletedFlag { get; set; }

        public virtual ICollection<Doctor> Doctors { get; set; }
        public virtual ICollection<Patient> Patients { get; set; }
    }
}
