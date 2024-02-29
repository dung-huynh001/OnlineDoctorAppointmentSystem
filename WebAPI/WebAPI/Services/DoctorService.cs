using Microsoft.EntityFrameworkCore;
using WebAPI.Domain.Entities;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Interfaces.IService;

namespace WebAPI.Services
{
    public class DoctorService : IDoctorService
    {
        private readonly IUnitOfWork _unitOfWork;

        public DoctorService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<List<DoctorOnDutyDto>> GetDoctorListOnDuty(DateTime dateTime)
        {
            var result = new List<DoctorOnDutyDto>();
            var workingDay = dateTime.Date;
            var time = dateTime.TimeOfDay;

            result = await _unitOfWork.Repository<Doctor>().GetAll
                .Include(d => d.Schedules)
                .Where(d => d.Schedules.Any(s =>
                    s.WorkingDay.Date == workingDay &&
                    s.ShiftTime <= time && s.BreakTime > time))
                .Select(d => new DoctorOnDutyDto
                {
                    FullName = d.FullName,
                    Speciality = d.Speciality,
                    Id = d.Id,
                })
                .ToListAsync();

            return result;
        }
    }
}
