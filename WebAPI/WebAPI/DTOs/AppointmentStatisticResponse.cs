namespace WebAPI.DTOs
{
    public class AppointmentStatisticResponse
    {
        public List<string> Colors { get; set; }
        public List<LineChartSerie> Series { get; set; }
        public LineChartXAxis Xaxis { get; set; }
        public LineChartYAxis Yaxis { get; set; }
    }

    public class LineChartSerie
    {
        public string Name { get; set; }
        public List<int> Data { get; set; }
    }

    public class LineChartXAxis
    {
        public List<string> Categories { get; set; }
        public AxisTitle Title { get; set; }
    }

    public class LineChartYAxis
    {
        public AxisTitle Title { get; set; }
        public int Min { get; set; }
        public int Max { get; set; }
        public bool Floating { get; set; }
    }

    public class AxisTitle
    {
        public string Text { get; set; }
    }
}
