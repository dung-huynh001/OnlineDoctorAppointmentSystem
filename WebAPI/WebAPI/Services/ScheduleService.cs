using AutoMapper;
using Microsoft.Data.SqlClient.Server;
using Microsoft.EntityFrameworkCore;
using System;
using System.Globalization;
using System.Linq;
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
        public async Task<ApiResponse> AddSchedule(CreateScheduleDto model)
        {
            var scheduleDate = model.ScheduleDate.Split(" to ");
            var scheduleDate_start = scheduleDate[0];
            var scheduleDate_end = scheduleDate[1];

            

            _unitOfWork.BeginTransaction();
            try
            {
                var mStartTime = TimeSpan.Parse(model.mStartTime);
                var mEndTime = TimeSpan.Parse(model.mEndTime);
                var nStartTime = TimeSpan.Parse(model.nStartTime);
                var nEndTime = TimeSpan.Parse(model.nEndTime);
                var aStartTime = TimeSpan.Parse(model.aStartTime);
                var aEndTime = TimeSpan.Parse(model.aEndTime);

                if (scheduleDate_start != scheduleDate_end)
                {
                    var _startDate = DateTime.ParseExact(scheduleDate_start, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                    var _endDate = DateTime.ParseExact(scheduleDate_start, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                    for(DateTime date = _startDate; date <= _endDate; date.AddDays(1))
                    {
                        var mSchedule = new Schedule();
                        mSchedule.ShiftTime = mStartTime;
                        mSchedule.BreakTime = mEndTime;
                        mSchedule.Description = model.Description;
                        mSchedule.Type = model.Type;
                        mSchedule.WorkingDay = date;
                        mSchedule.DoctorId = model.DoctorId;
                        mSchedule.ConsultantTime = model.ConsultantTime;

                        var aSchedule = new Schedule();
                        aSchedule.ShiftTime = aStartTime;
                        aSchedule.BreakTime = aEndTime;
                        aSchedule.Description = model.Description;
                        aSchedule.Type = model.Type;
                        aSchedule.WorkingDay = date;
                        aSchedule.DoctorId = model.DoctorId;
                        aSchedule.ConsultantTime = model.ConsultantTime;

                        var nSchedule = new Schedule();
                        nSchedule.ShiftTime = nStartTime;
                        nSchedule.BreakTime = nEndTime;
                        nSchedule.Description = model.Description;
                        nSchedule.Type = model.Type;
                        nSchedule.WorkingDay = date;
                        nSchedule.DoctorId = model.DoctorId;
                        nSchedule.ConsultantTime = model.ConsultantTime;

                        await _unitOfWork.Repository<Schedule>().AddAsync(mSchedule);
                        await _unitOfWork.Repository<Schedule>().AddAsync(aSchedule);
                        await _unitOfWork.Repository<Schedule>().AddAsync(nSchedule);
                        _unitOfWork.Commit();
                    }
                }
                return new ApiResponse
                {
                    IsSuccess = true,
                    Message = $"Add schedule for doctor with id {model.DoctorId} successfully",
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

                return new ApiResponse { IsSuccess = true, Id = schedule.Id.ToString(), Message = "Updated schedule success" };
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

        public async Task<DatatableResponse<DoctorCardDto>> GetDoctorList(ScheduleFilter filter)
        {
            var records = _unitOfWork.Repository<Doctor>().GetAll
                .Select(d => new DoctorCardDto
                {
                    AvatarUrl = d.User.AvatarUrl,
                    DepartmentName = d.Department.DepartmentName,
                    DepartmentId = d.DepartmentId,
                    FullName = d.FullName,
                    Id = d.Id,
                    Speciality = d.Speciality
                });
            var recordsTotal = records.Count();

            var searchValue = filter.SearchValue?.Trim().ToLower() ?? "";
            var departmentId = filter.DepartmentId;

            records = records.Where(r =>
                r.DepartmentName.Trim().ToLower().Contains(searchValue) ||
                r.Speciality.Trim().ToLower().Contains(searchValue) ||
                r.FullName.Trim().ToLower().Contains(searchValue) ||
                r.Id.ToString().Contains(searchValue));

            if (departmentId != 0)
            {
                records = records.Where(r => r.DepartmentId.Equals(departmentId));
            }

            records = records.Skip(filter.Start).Take(filter.Length);
            return new DatatableResponse<DoctorCardDto>
            {
                Data = await records.ToListAsync(),
                RecordsFiltered = recordsTotal,
                RecordsTotal = recordsTotal,
            };
        }
    }
}
