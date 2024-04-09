namespace WebAPI.Models
{
    public class ScheduleFilter
    {
        public string? SearchValue { get; set; }
        public int DepartmentId { get; set; }
        public int Length { get; set; }
        public int Start { get; set; }
    }
}
