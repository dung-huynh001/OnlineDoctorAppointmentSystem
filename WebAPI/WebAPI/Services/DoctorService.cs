using AutoMapper;
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
        private readonly IMapper _mapper;

        public DoctorService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }

        public async Task<List<DoctorOnDutyDto>> GetDoctorListOnDuty(DateTime dateTime)
        {
            var result = new List<DoctorOnDutyDto>();
            var workingDay = dateTime.Date;
            var time = dateTime.TimeOfDay;

            result = await _unitOfWork.Repository<Doctor>().GetAll
                .Include(d => d.Schedules)
                .Where(d => !d.IsDeleted &&
                    d.Schedules.Any(s =>
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

        public async Task<bool> Create(CreateDoctorDto model)
        {
            _unitOfWork.BeginTransaction();
            try
            {
                var doctor = _mapper.Map<Doctor>(model);
                await _unitOfWork.Repository<Doctor>().AddAsync(doctor);
                _unitOfWork.Commit();

                return true;
            }
            catch(Exception ex)
            {
                _unitOfWork.Rollback();
                return false;
            }
        }
    }
}
