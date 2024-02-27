using System;
using System.Collections.Generic;
using WebAPI.Domain.Common;

namespace WebAPI.Domain.Entities
{
    public partial class SystemPara : BaseEntity
    {
        public string Paraid { get; set; } = null!;
        public string Groupid { get; set; } = null!;
        public string Paraval { get; set; } = null!;
        public string? Note { get; set; }
    }
}
