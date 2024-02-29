using System;
using System.Collections.Generic;
using WebAPI.Domain.Common;

namespace WebAPI.Domain.Entities
{
    public partial class Doctor : BaseEntity
    {
        public Doctor()
        {
            Schedules = new HashSet<Schedule>();
        }

        public string UserId { get; set; }
        public int DepartmentId { get; set; }
        public string FullName { get; set; } 
        public string NationalId { get; set; } 
        public int Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PhoneNumber { get; set; } 
        public string Address { get; set; } 
        public string Speciality { get; set; } 
        public DateTime WorkingStartDate { get; set; }
        public DateTime WorkingEndDate { get; set; }

        public virtual Department Department { get; set; } 
        public virtual AppUser User { get; set; } 
        public virtual ICollection<Schedule> Schedules { get; set; }
    }
}
