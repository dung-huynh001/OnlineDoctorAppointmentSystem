namespace WebAPI.DTOs
{
    public class GenderStatisticDto
    {
        public string Title { get; set; } = string.Empty;
        public int Value { get; set; }
        public double Percentage { get; set; }
        public string Suffix { get; set; } = "%";
        public string Color { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
    }
}
