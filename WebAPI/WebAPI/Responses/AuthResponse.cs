using WebAPI.Domain.Enums;

namespace WebAPI.Responses
{
    public class AuthResponse
    {
        public string Id { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string UserType { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string? AvatarUrl { get; set; }
        public StatusAccount Status { get; set; }
        public string Token { get; set; } = string.Empty;
    }
}
