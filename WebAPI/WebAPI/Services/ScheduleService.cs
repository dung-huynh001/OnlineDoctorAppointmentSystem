using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebAPI.Domain.Entities;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Interfaces.IService;
using WebAPI.Models;
using WebAPI.Responses;

namespace WebAPI.Services
{
    public class ScheduleService : IScheduleService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ScheduleService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            this._mapper = mapper;
            this._unitOfWork = unitOfWork;
        }
        public async Task<ApiResponse> AddSchedule(AddScheduleDto model)
        {
            _unitOfWork.BeginTransaction();
            try
            {
                var schedule = _mapper.Map<Schedule>(model);
                await _unitOfWork.Repository<Schedule>().AddAsync(schedule);
                _unitOfWork.Commit();
                return new ApiResponse
                {
                    IsSuccess = true,
                    Message = $"Add schedule for doctor with id {schedule.DoctorId} successfully",
                    Id = schedule.Id.ToString()
                };
            }
            catch
            {
                _unitOfWork.Rollback();
                return new ApiResponse
                {
                    IsSuccess = false,
                    Message = $"Add schedule for doctor with id {model.DoctorId} failed"
                };
            }
        }

        public async Task<ApiResponse> UpdateSchedule(UpdateScheduleDto model)
        {
            _unitOfWork.BeginTransaction();
            try
            {
                var schedule = _mapper.Map<Schedule>(model);
                await _unitOfWork.Repository<Schedule>().UpdateAsync(schedule);
                _unitOfWork.Commit();

                return new ApiResponse { IsSuccess = true, Id = schedule.Id.ToString(), Message="Updated schedule success" };
            }
            catch
            {
                _unitOfWork.Rollback();
                return new ApiResponse() { IsSuccess = false, Message = "Update schedule failed" };
            }
        }

        public async Task<ApiResponse> DeleteSchedule(int id)
        {
            _unitOfWork.BeginTransaction();
            try
            {
                await _unitOfWork.Repository<Schedule>().DeleteByIdAsync(id);
                _unitOfWork.Commit();

                return new ApiResponse
                {
                    Id = id.ToString(),
                    IsSuccess = true,
                    Message = "Deleted schedule success"
                };
            }
            catch
            {
                _unitOfWork.Rollback();

                return new ApiResponse
                {
                    IsSuccess = false,
                    Message = "Delete schedule failed"
                };
            }
        }

        public async Task<GetSchedulesByDoctorIdDto> GetSchedulesByDoctorId(int doctorId)
        {
            var schedules = _unitOfWork.Repository<Schedule>().GetAll
                .Where(s => !s.IsDeleted &&
                    s.DoctorId == doctorId &&
                    s.WorkingDay.CompareTo(DateTime.Now) >= 0)
                .Select(s => _mapper.Map<SchedulesOfDoctor>(s))
                .ToList();

            var doctor = await _unitOfWork.Repository<Doctor>().GetByIdAsync(doctorId);
            var doctorAndSchedulesDto = _mapper.Map<GetSchedulesByDoctorIdDto>(doctor);

            doctorAndSchedulesDto.Schedules = schedules;

            return doctorAndSchedulesDto;
        }
    }
}
