using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IMailService
    {
        Task SendEmailAsync(MailRequest request);
    }
}