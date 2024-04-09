using Microsoft.AspNetCore.Hosting;
using WebAPI.Interfaces.IService;

namespace WebAPI.Services
{
    public class UploadService : IUploadService
    {

        public async Task UploadImageToFolderAsync(IFormFile img, string filePath)
        {
            /*if(img == null || img.Length == 0)
            {
                return "404";
            }

            string uniqueName = Guid.NewGuid().ToString() + img.FileName;

            string filePath = Path.Combine(Directory.GetCurrentDirectory(), folderPath, uniqueName);*/

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await img.CopyToAsync(fileStream);
            }
        }
    }
}
