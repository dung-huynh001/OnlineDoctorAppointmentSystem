using WebAPI.Domain.Enums;

namespace WebAPI.Responses
{
    public class AuthResponse
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string UserType { get; set; }
        public string FullName { get; set; }
        public string? AvatarUrl { get; set; }
        public StatusAccount Status { get; set; }
        public string Token { get; set; }
    }
}
