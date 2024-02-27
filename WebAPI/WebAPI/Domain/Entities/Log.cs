using WebAPI.Domain.Common;

namespace WebAPI.Domain.Entities
{
    public partial class Log : BaseEntity
    {
        public string? EventCatg { get; set; }
        public string? EventMsg { get; set; }
        public string? EventSrc { get; set; }
        public string? EventType { get; set; }
    }
}
