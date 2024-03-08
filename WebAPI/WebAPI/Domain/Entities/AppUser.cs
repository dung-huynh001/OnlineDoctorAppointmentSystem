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
        public int? PasswordRecoveryQue1 { get; set; }
        public int? PasswordRecoveryQue2 { get; set; }
        public int? PasswordRecoveryQue3 { get; set; }
        public string? PasswordRecoveryAns1 { get; set; }
        public string? PasswordRecoveryAns2 { get; set; }
        public string? PasswordRecoveryAns3 { get; set; }
        public bool Status { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsDeleted { get; set; }

        public virtual ICollection<Doctor> Doctors { get; set; }
        public virtual ICollection<Patient> Patients { get; set; }
    }
}
