using WebAPI.DTOs;

namespace WebAPI.Models
{
    public class EJ2UpdateParams<T> where T : class
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? action { get; set; }
        public List<T>? added { get; set; }
        public List<T>? changed { get; set; }
        public List<T>? deleted { get; set; }
    }
}
