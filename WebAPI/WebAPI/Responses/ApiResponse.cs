namespace WebAPI.Responses
{
    public class ApiResponse
    {
        public string Id { get; set; }
        public string Message { get; set; }
        public bool IsSuccess { get; set; } = true;
        public List<string> Error { get; set; } = new List<string>();
    }
}
