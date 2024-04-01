using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Domain.Entities;
using WebAPI.Exceptions;
using WebAPI.Interfaces;
using WebAPI.Interfaces.IService;

namespace WebAPI.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;

        public CurrentUserService(IUnitOfWork unitOfWork, UserManager<AppUser> userManager)
        {
            this._unitOfWork = unitOfWork;
            _userManager = userManager;
        }

        public async Task<Doctor> GetDoctorInfo(string userId)
        {
            var doctor = await _unitOfWork.Repository<Doctor>().GetAll
                .FirstOrDefaultAsync(d => d.UserId.Equals(userId) && d.IsDeleted == false);
            if (doctor == null) 
                throw new NotFoundException("doctor", userId);

            return doctor!;
        }

        public async Task<string> GetFullName(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
                throw new NotFoundException("User", id);
            var userType = user.UserType;
            switch(userType.ToLower().Trim())
            {
                case "patient":
                    return (await _unitOfWork.Repository<Patient>().GetAll.Where(d => d.UserId == id).FirstOrDefaultAsync())!.FullName;
                case "doctor":
                    return (await _unitOfWork.Repository<Doctor>().GetAll.Where(d => d.UserId == id).FirstOrDefaultAsync())!.FullName;
                default:
                    return "admin";
            }
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
