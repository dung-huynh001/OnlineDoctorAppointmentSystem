using Microsoft.AspNetCore.Hosting;
using WebAPI.Interfaces.IService;

namespace WebAPI.Services
{
    public class UploadService : IUploadService
    {

        public async Task UploadImageToFolderAsync(IFormFile img, string filePath)
        {
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await img.CopyToAsync(fileStream);
            }
        }
    }
}
