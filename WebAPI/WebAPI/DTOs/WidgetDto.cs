namespace WebAPI.DTOs
{
    public class WidgetDto
    {
        public string Title { get; set; } = string.Empty;
        public string ShortDesc { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public string IconClass { get; set; } = string.Empty;
        public string Badge { get; set; } = string.Empty;
        public string BadgeClass { get; set; } = string.Empty;
        public double IncreaseValue { get; set; }
        public string Prefix { get; set; } = string.Empty;
        public string Suffix { get; set; } = "%";
        public bool IsIncrease { get; set; } = false;
        public int Value { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
