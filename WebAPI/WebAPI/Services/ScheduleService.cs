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
        private readonly IMailService _mailService;

        public ScheduleService(IMapper mapper, IUnitOfWork unitOfWork, IMailService mailService)
        {
            this._mapper = mapper;
            this._unitOfWork = unitOfWork;
            _mailService = mailService;
        }
        public async Task<ApiResponse> AddSchedule(CreateScheduleDto model)
        {
            var scheduleDate = model.ScheduleDate.Split(" to ");
            var scheduleDate_start = scheduleDate[0];
            var scheduleDate_end = scheduleDate[1];
            var _startDate = DateTime.ParseExact(scheduleDate_start, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            var _endDate = DateTime.ParseExact(scheduleDate_end, "yyyy-MM-dd", CultureInfo.InvariantCulture);

            _unitOfWork.BeginTransaction();
            try
            {
                List<Schedule> schedules = new List<Schedule>();

                var mStartTime = TimeSpan.Parse(model.mStartTime);
                var mEndTime = TimeSpan.Parse(model.mEndTime);
                var nStartTime = TimeSpan.Parse(model.nStartTime);
                var nEndTime = TimeSpan.Parse(model.nEndTime);
                var aStartTime = TimeSpan.Parse(model.aStartTime);
                var aEndTime = TimeSpan.Parse(model.aEndTime);

                for (DateTime date = _startDate; date <= _endDate; date = date.AddDays(1.0))
                {
                    var exist = _unitOfWork.Repository<Schedule>().GetAll
                        .Where(
                            s => s.DoctorId == model.DoctorId &&
                            s.WorkingDay == date &&
                            s.IsDeleted != true)
                        .ToList();
                    if (exist.Count > 0)
                    {
                        if(!model.Force)
                        {
                            continue;
                        }
                        else
                        {
                            foreach (var item in exist)
                            {
                                await _unitOfWork.Repository<Schedule>().DeleteByIdAsync(item.Id);
                            }
                        }
                    }

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

                    schedules.Add(aSchedule);
                    schedules.Add(mSchedule);
                    schedules.Add(nSchedule);
                }
                _unitOfWork.Repository<Schedule>().AddRange(schedules);
                _unitOfWork.Commit();

                var doctor = await _unitOfWork.Repository<Doctor>().GetByIdAsync(model.DoctorId);
                var toEmail = doctor.User.Email;
                var _startDateStr = _startDate.ToString("MMM dd, yyyy");
                var _endDateStr = _endDate.ToString("MMM dd, yyyy");
                string scheduleDateStr = $"{_startDateStr}";
                if(!_startDateStr.Equals(_endDateStr))
                {
                    scheduleDateStr = $"from {_startDateStr} to {_endDateStr}";
                }

                var formMail = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "EmailTemplates/AssignmentMailSample.htm"));
                formMail = formMail.Replace("#doctor#", doctor.FullName);
                formMail = formMail.Replace("#mStart#", model.mStartTime);
                formMail = formMail.Replace("#aStart#", model.aStartTime);
                formMail = formMail.Replace("#nStart#", model.nStartTime);
                formMail = formMail.Replace("#mEnd#", model.mEndTime);
                formMail = formMail.Replace("#aEnd#", model.aEndTime);
                formMail = formMail.Replace("#nEnd#", model.nEndTime);
                formMail = formMail.Replace("#scheduleDate#", scheduleDateStr);

                _ = Task.Run(() => _mailService.SendEmailAsync(new MailRequest
                {
                    ToEmail = toEmail,
                    Subject = $"Assigned duty schedule {scheduleDateStr}",
                    Body = formMail
                }));
                return new ApiResponse
                {
                    IsSuccess = true,
                    Message = $"Add schedule for doctor successfully",
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

        public async Task<List<ScheduleEventDto>> GetScheduleEventsByDoctor(int doctorId)
        {
            var schedules = await _unitOfWork.Repository<Schedule>().GetAll
                .Where(s => !s.IsDeleted && s.DoctorId == doctorId)
                .Select(s => new ScheduleEventDto
                {
                    Id=s.Id,
                    ConsultantTime = s.ConsultantTime,
                    Description = s.Description,
                    StartTime = s.ShiftTime.ToString(@"hh\:mm\:ss"),
                    EndTime = s.BreakTime.ToString(@"hh\:mm\:ss"),
                    Type = s.Type,
                    WorkingDay = s.WorkingDay.ToString("yyyy-MM-dd")
                })
                .ToListAsync();
            return schedules;
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
