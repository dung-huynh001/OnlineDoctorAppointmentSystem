namespace WebAPI.Interfaces.IService
{
    public interface IUserService
    {
        Task<string> GetFullName(string id, string UserType);
    }
}
