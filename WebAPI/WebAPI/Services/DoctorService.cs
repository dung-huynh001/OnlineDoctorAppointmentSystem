using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using WebAPI.Domain.Entities;
using WebAPI.DTOs;
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
            catch
            {
                _unitOfWork.Rollback();
                return false;
            }
        }

        public Task<DatatableResponse<GetDoctorToDrawTableDto>> GetAll(DataTablesParameters parameters)
        {
            var response = new DatatableResponse<GetDoctorToDrawTableDto>();

            var searchValue = parameters.Search.Value.IsNullOrEmpty() ? "" : parameters.Search.Value?.ToLower().Trim();

            // Filter with search value and pagination
            var records = _unitOfWork.Repository<Doctor>().GetAll
                .Include(d => d.User)
                .Include(d => d.Department)
                .Select(d => new GetDoctorToDrawTableDto
                {
                    Id = d.Id,
                    FullName = d.FullName,
                    Speciality = d.Speciality,
                    Department = d.Department.DepartmentName,
                    NationalId = d.NationalId,
                    Gender = d.Gender == 0 ? "Male" : d.Gender == 1 ? "Female" : "Other",
                    DateOfBirth = d.DateOfBirth,
                    PhoneNumber = d.PhoneNumber,
                    Email = d.User.Email,
                    WorkingStartDate = d.WorkingStartDate,
                    WorkingEndDate = d.WorkingEndDate,
                    CreatedBy = d.CreatedBy,
                    UpdatedBy = d.UpdatedBy,
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


            // Filter with order column
            if (parameters.Order.Count() != 0)
                switch (parameters.Order[0].Column)
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
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.Id) : records.OrderByDescending(r => r.Id);
                        break;
                }

            records = records
                .Skip(parameters.Start)
                .Take(parameters.Length);

            response.RecordsTotal = recordsTotal;
            response.RecordsFiltered = recordsTotal;
            response.Data = records.ToList();

            return Task.FromResult(response);
        }
    }
}
