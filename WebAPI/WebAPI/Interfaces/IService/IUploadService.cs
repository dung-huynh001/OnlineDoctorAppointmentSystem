namespace WebAPI.Interfaces.IService
{
    public interface IUploadService
    {
        Task UploadImageToFolderAsync(IFormFile img, string path);
    }
}
