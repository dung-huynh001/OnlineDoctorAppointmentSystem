using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Domain.Entities;
using WebAPI.Exceptions;
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

        public async Task<Doctor> GetDoctorInfo(string userId)
        {
            var doctor = await _unitOfWork.Repository<Doctor>().GetAll
                .FirstOrDefaultAsync(d => d.UserId.Equals(userId) && d.IsDeleted == false);
            if (doctor == null) 
                throw new NotFoundException("doctor", userId);

            return doctor!;
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

            if (fullName.IsNullOrEmpty()) 
                throw new NotFoundException("User", id);

            return fullName!;
        }

        public async Task<Patient> GetPatientInfo(string userId)
        {
            var patient = await _unitOfWork.Repository<Patient>().GetAll
                .FirstOrDefaultAsync(d => d.UserId.Equals(userId) && d.IsDeleted == false);
            if (patient == null) 
                throw new NotFoundException("patient", userId);

            return patient!;
        }
    }
}
