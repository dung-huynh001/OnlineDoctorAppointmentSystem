using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace WebAPI.Domain.Entities
{
    public partial class AppRole : IdentityRole
    {
        public AppRole() : base() { }
        public AppRole(string roleName) : base(roleName)
        {
            this.Name = roleName;
        }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool DeletedFlag { get; set; }

    }
}
