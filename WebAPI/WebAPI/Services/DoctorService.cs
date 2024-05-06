using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using WebAPI.Domain.Entities;
using WebAPI.DTOs;
using WebAPI.Exceptions;
using WebAPI.Implementations;
using WebAPI.Interfaces;
using WebAPI.Interfaces.IService;
using WebAPI.Models;
using WebAPI.Responses;

namespace WebAPI.Services
{
    public class DoctorService : IDoctorService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public DoctorService(IUnitOfWork unitOfWork, IMapper mapper, ICurrentUserService currentUserService)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
            this._currentUserService = currentUserService;
        }

        public async Task<List<DoctorOnDutyDto>> GetDoctorsOnDuty(DateTime dateTime)
        {
            var doctors = new List<DoctorOnDutyDto>();
            var workingDay = dateTime.Date;
            var time = dateTime.TimeOfDay;


            var result = await _unitOfWork.Repository<Schedule>().GetAll
                .Include(s => s.Doctor)
                .Where(s =>
                    !s.IsDeleted &&
                    s.WorkingDay.Date == workingDay &&
                    s.ShiftTime.CompareTo(time) <= 0 &&
                    s.BreakTime.CompareTo(time) >= 0)
                .Select(s => new DoctorOnDutyDto
                {
                    AvatarUrl = s.Doctor.User.AvatarUrl,
                    DoctorId = s.DoctorId,
                    ScheduleId = s.Id,
                    FullName = s.Doctor.FullName,
                    Speciality = s.Doctor.Speciality,
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
            catch
            {
                _unitOfWork.Rollback();
                return false;
            }
        }

        public Task<DatatableResponse<DoctorTableDto>> GetAll(DataTablesParameters parameters)
        {
            var response = new DatatableResponse<DoctorTableDto>();

            string searchValue = parameters.Search?.Value?.ToLower().Trim() ?? "";

            var records = _unitOfWork.Repository<Doctor>().GetAll
                .Include(d => d.User)
                .Include(d => d.Department)
                .Select(d => new DoctorTableDto
                {
                    Id = d.Id,
                    FullName = d.FullName,
                    Speciality = d.Speciality,
                    Department = d.Department.DepartmentName!,
                    NationalId = d.NationalId,
                    Gender = d.Gender == 0 ? "Male" : d.Gender == 1 ? "Female" : "Other",
                    DateOfBirth = d.DateOfBirth,
                    PhoneNumber = d.PhoneNumber,
                    Email = d.User.Email,
                    WorkingStartDate = d.WorkingStartDate,
                    WorkingEndDate = d.WorkingEndDate,
                    CreatedBy = d.CreatedBy ?? "admin",
                    UpdatedBy = d.UpdatedBy ?? "admin",
                    CreatedDate = d.CreatedDate,
                    UpdatedDate = d.UpdatedDate,
                    IsDeleted = d.IsDeleted
                });


            var recordsTotal = records.Count();

            records = records.Where(d =>
                    d.Id.ToString().Trim().Contains(searchValue)
                    || d.Department.Trim().ToLower().Contains(searchValue)
                    || d.FullName.Trim().ToLower().Contains(searchValue)
                    || d.Email.Trim().ToLower().Contains(searchValue)
                    || d.Gender.Trim().ToLower().Contains(searchValue)
                    || d.NationalId.Trim().ToLower().Contains(searchValue)
                    || d.Speciality.Trim().ToLower().Contains(searchValue)
                    || d.DateOfBirth.ToString().Trim().ToLower().Contains(searchValue)
                    || d.PhoneNumber.Trim().ToLower().Contains(searchValue)
                    || d.WorkingEndDate.ToString().Trim().ToLower().Contains(searchValue)
                    || d.WorkingStartDate.ToString().Trim().ToLower().Contains(searchValue)
                    || d.CreatedBy.Trim().ToLower().Contains(searchValue)
                    || d.CreatedDate.ToString().Trim().ToLower().Contains(searchValue)
                    || d.UpdatedBy.Trim().ToLower().Contains(searchValue)
                    || d.UpdatedDate.ToString().Trim().ToLower().Contains(searchValue)
                    || d.IsDeleted.ToString().Trim().ToLower().Contains(searchValue));


            if (parameters.Order?.Count() != 0)
                switch (parameters.Order?[0].Column)
                {
                    case (2):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.FullName) : records.OrderByDescending(r => r.FullName);
                        break;
                    case (3):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.Speciality) : records.OrderByDescending(r => r.Speciality);
                        break;
                    case (4):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.Department) : records.OrderByDescending(r => r.Department);
                        break;
                    case (5):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.Gender) : records.OrderByDescending(r => r.Gender);
                        break;
                    case (6):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.DateOfBirth) : records.OrderByDescending(r => r.DateOfBirth);
                        break;
                    case (7):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.NationalId) : records.OrderByDescending(r => r.NationalId);
                        break;
                    case (8):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.PhoneNumber) : records.OrderByDescending(r => r.PhoneNumber);
                        break;
                    case (9):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.Email) : records.OrderByDescending(r => r.Email);
                        break;
                    case (10):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.IsDeleted) : records.OrderByDescending(r => r.IsDeleted);
                        break;
                    case (11):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.WorkingStartDate) : records.OrderByDescending(r => r.WorkingStartDate);
                        break;
                    case (12):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.WorkingEndDate) : records.OrderByDescending(r => r.WorkingEndDate);
                        break;
                    case (13):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.CreatedBy) : records.OrderByDescending(r => r.CreatedBy);
                        break;
                    case (14):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.CreatedDate) : records.OrderByDescending(r => r.CreatedDate);
                        break;
                    case (15):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.UpdatedBy) : records.OrderByDescending(r => r.UpdatedBy);
                        break;
                    case (16):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.UpdatedDate) : records.OrderByDescending(r => r.UpdatedDate);
                        break;
                    default:
                        records = parameters.Order?[0].Dir == "asc" ? records.OrderBy(r => r.Id) : records.OrderByDescending(r => r.Id);
                        break;
                }

            var recordsFiltered = records.Count();

            records = records
                .Skip(parameters.Start)
                .Take(parameters.Length);

            var data = records.ToList();

            data.ForEach(item =>
            {
                item.UpdatedBy = _currentUserService.GetFullName(item.UpdatedBy);
                item.CreatedBy = _currentUserService.GetFullName(item.CreatedBy);
            });

            response.RecordsTotal = recordsTotal;
            response.RecordsFiltered = recordsFiltered;
            response.Data = data;

            return Task.FromResult(response);
        }

        public async Task<DoctorDetailsDto> GetDoctorDetails(int id)
        {
            var doctor = await _unitOfWork.Repository<Doctor>().GetAll
                .Where(d => d.Id == id)
                .Include(d => d.User)
                .Select(d => new DoctorDetailsDto
                {
                    Id = id,
                    UserId = d.UserId,
                    Address = d.Address,
                    DateOfBirth = d.DateOfBirth.ToString("dd/MM/yyyy"),
                    DepartmentId = d.DepartmentId,
                    DepartmentName = d.Department.DepartmentName!.Trim(),
                    Email = d.User.Email.Trim(),
                    FullName = d.FullName,
                    AvatarUrl = d.User.AvatarUrl,
                    Gender = d.Gender,
                    NationalId = d.NationalId.Trim(),
                    PhoneNumber = d.PhoneNumber.Trim(),
                    Speciality = d.Speciality.Trim(),
                    WorkingEndDate = d.WorkingEndDate.Date.ToString("dd/MM/yyyy"),
                    WorkingStartDate = d.WorkingStartDate.ToString("dd/MM/yyyy"),
                    CreatedDate = d.CreatedDate.ToString("hh:mm:ss tt dd/MM/yyyy"),
                    UpdatedDate = d.UpdatedDate.ToString("hh:mm:ss tt dd/MM/yyyy"),
                })
                .FirstOrDefaultAsync();
            if (doctor == null)
                throw new NotFoundException("doctor", id);
            return doctor;
        }

        public async Task<DoctorDetailsDto> GetDoctorDetailsByUserId(string id)
        {
            var doctor = await _unitOfWork.Repository<Doctor>().GetAll
                .Where(d => d.UserId == id)
                .Include(d => d.User)
                .Select(d => new DoctorDetailsDto
                {
                    Id = d.Id,
                    UserId = d.UserId,
                    Address = d.Address,
                    DateOfBirth = d.DateOfBirth.ToString("dd/MM/yyyy"),
                    DepartmentId = d.DepartmentId,
                    DepartmentName = d.Department.DepartmentName!.Trim(),
                    Email = d.User.Email.Trim(),
                    FullName = d.FullName,
                    AvatarUrl = d.User.AvatarUrl,
                    Gender = d.Gender,
                    NationalId = d.NationalId.Trim(),
                    PhoneNumber = d.PhoneNumber.Trim(),
                    Speciality = d.Speciality.Trim(),
                    WorkingEndDate = d.WorkingEndDate.Date.ToString("dd/MM/yyyy"),
                    WorkingStartDate = d.WorkingStartDate.ToString("dd/MM/yyyy"),
                    CreatedDate = d.CreatedDate.ToString("hh:mm:ss tt dd/MM/yyyy"),
                    UpdatedDate = d.UpdatedDate.ToString("hh:mm:ss tt dd/MM/yyyy"),
                })
                .FirstOrDefaultAsync();
            if (doctor == null)
                throw new NotFoundException("doctor", id);
            return doctor;
        }

        public async Task<bool> UpdateDoctor(DoctorInfoDto data)
        {
            _unitOfWork.BeginTransaction();
            try
            {
                var doctor = await _unitOfWork.Repository<Doctor>().GetByIdAsync(data.Id);
                doctor.Id = data.Id;
                doctor.Address = data.Address ?? doctor.Address;
                doctor.PhoneNumber = data.PhoneNumber ?? doctor.PhoneNumber;
                doctor.FullName = data.FullName ?? doctor.FullName;
                doctor.Gender = data.Gender;
                doctor.NationalId = data.NationalId ?? doctor.NationalId;
                doctor.DateOfBirth = data.DateOfBirth;

                if (await _unitOfWork.Repository<Doctor>().UpdateAsync(doctor) != null)
                {
                    _unitOfWork.Commit();
                    return true;
                }

                throw new Exception();
            }
            catch
            {
                _unitOfWork.Rollback();
                return false;
            }
        }

        public async Task<ApiResponse> UpdateContract(ContractDto data)
        {
            _unitOfWork.BeginTransaction();
            try
            {
                var doctor = await _unitOfWork.Repository<Doctor>().GetByIdAsync(data.Id);
                doctor.Speciality = data.Speciality!;
                doctor.DepartmentId = data.DepartmentId;
                doctor.WorkingStartDate = data.WorkingStartDate;
                doctor.WorkingEndDate = data.WorkingEndDate;
                if (await _unitOfWork.Repository<Doctor>().UpdateAsync(doctor) != null)
                {
                    _unitOfWork.Commit();
                    return new ApiResponse
                    {
                        IsSuccess = true,
                        Message = "Updated work info successfully",
                        Id = data.Id.ToString(),
                    };
                }
                throw new Exception();
            }
            catch
            {
                _unitOfWork.Rollback();
                return new ApiResponse
                {
                    IsSuccess = false,
                    Message = "Update work info failed",
                    Id = data.Id.ToString(),
                };
            }
        }

        public async Task<ApiResponse> Delete(int id)
        {
            _unitOfWork.BeginTransaction();
            try
            {
                int deletedId = await _unitOfWork.Repository<Doctor>().DeleteByIdAsync(id);
                _unitOfWork.Commit();

                return new ApiResponse
                {
                    IsSuccess = true,
                    Id = deletedId.ToString(),
                    Message = $"Deleted doctor with ID {id} successfully"
                };
            }
            catch
            {
                _unitOfWork.Rollback();

                return new ApiResponse
                {
                    IsSuccess = false,
                    Id = id.ToString(),
                    Message = $"Not found doctor with ID {id}"
                };
            }
        }

        public async Task<ApiResponse> Restore(int id)
        {
            _unitOfWork.BeginTransaction();
            try
            {
                var doctor = await _unitOfWork.Repository<Doctor>().GetByIdAsync(id);
                doctor.IsDeleted = false;

                await _unitOfWork.Repository<Doctor>().UpdateAsync(doctor);

                _unitOfWork.Commit();

                return new ApiResponse
                {
                    IsSuccess = true,
                    Id = id.ToString(),
                    Message = $"Restore doctor with ID {id} successfully"
                };
            }
            catch
            {
                _unitOfWork.Rollback();

                return new ApiResponse
                {
                    IsSuccess = false,
                    Id = id.ToString(),
                    Message = $"Not found doctor with ID {id}"
                };
            }
        }
    }
}
