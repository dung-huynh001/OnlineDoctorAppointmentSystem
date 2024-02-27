using System;
using System.Collections.Generic;
using WebAPI.Domain.Common;

namespace WebAPI.Domain.Entities
{
    public partial class Department : BaseEntity
    {
        public Department()
        {
            Doctors = new HashSet<Doctor>();
        }

        public string DepartmentName { get; set; } = null!;
        public virtual ICollection<Doctor> Doctors { get; set; }
    }
}
