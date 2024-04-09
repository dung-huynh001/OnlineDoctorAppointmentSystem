namespace WebAPI.Responses
{
    public class DatatableResponse<T> where T : class
    {
        public List<T> Data { get; set; } = new List<T>();
        public int RecordsFiltered { get; set; }
        public int RecordsTotal { get; set; }
    }
}
