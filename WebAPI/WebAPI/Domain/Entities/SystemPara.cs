using System;
using System.Collections.Generic;
using WebAPI.Domain.Common;

namespace WebAPI.Domain.Entities
{
    public partial class SystemPara : BaseEntity
    {
        public string Paraid { get; set; } 
        public string Groupid { get; set; } 
        public string Paraval { get; set; } 
        public string? Note { get; set; }
    }
}
