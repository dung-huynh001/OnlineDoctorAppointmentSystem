using Microsoft.EntityFrameworkCore;
using WebAPI.Domain.Entities;
using WebAPI.Interfaces;
using WebAPI.Interfaces.IService;

namespace WebAPI.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;

        public UserService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }
        public async Task<string> GetFullName(string id, string userType)
        {
            string? fullName = "";
            switch(userType.Trim().ToLower())
            {
                case "patient":
                    var patient = await _unitOfWork.Repository<Patient>().GetAll
                        .Where(p => p.UserId.Equals(id))
                        .FirstOrDefaultAsync();
                    fullName = patient?.FullName;
                    break;
                case "doctor":
                    var doctor = await _unitOfWork.Repository<Doctor>().GetAll
                        .Where(p => p.UserId.Equals(id))
                        .FirstOrDefaultAsync();
                    fullName = doctor?.FullName;
                    break;
                default:
                    return "Admin";
            }
            return fullName;
        }
    }
}
