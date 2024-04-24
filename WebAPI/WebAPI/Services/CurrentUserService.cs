using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using WebAPI.Domain.Entities;
using WebAPI.Exceptions;
using WebAPI.Infrastructure.Context;
using WebAPI.Interfaces;
using WebAPI.Interfaces.IService;

namespace WebAPI.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHttpContextAccessor _accessor;

        public CurrentUserService(IUnitOfWork unitOfWork, IHttpContextAccessor accessor)
        {
            this._unitOfWork = unitOfWork;
            this._accessor = accessor;
        }

        public string GetCurrentUserId()
        {
            return _accessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "";
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
            switch(userType.ToLower().Trim())
            {
                case "patient":
                    return (await _unitOfWork.Repository<Patient>().GetAll.Where(d => d.UserId == id).FirstOrDefaultAsync())!.FullName!;
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
