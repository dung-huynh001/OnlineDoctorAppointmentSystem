using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Domain.Entities;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Interfaces.IService;
using WebAPI.Models;
using WebAPI.Responses;

namespace WebAPI.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DepartmentService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }

        public async Task<ApiResponse> Create(CreateDepartmentDto model)
        {
            _unitOfWork.BeginTransaction();
            try
            {
                var department = _mapper.Map<CreateDepartmentDto, Department>(model);
                await _unitOfWork.Repository<Department>().AddAsync(department);
                _unitOfWork.Commit();

                return new ApiResponse
                {
                    Id = department.Id.ToString(),
                    IsSuccess = true,
                    Message = "Create new department success!"
                };
            }
            catch
            {
                _unitOfWork.Rollback();
                return new ApiResponse
                {
                    IsSuccess = false,
                    Message = "Create new department failed!"
                };
            }
        }

        public async Task<List<Department>> GetAll()
        {
            var result = await _unitOfWork.Repository<Department>().GetAll.ToListAsync();
            return result;
        }

        public async Task<DatatableResponse<Department>> Get(DataTablesParameters parameters)
        {
            DatatableResponse<Department> response = new DatatableResponse<Department>();

            var searchValue = parameters.Search.Value.IsNullOrEmpty() ? "" : parameters.Search.Value.ToLower().Trim();

            // Filter with search value and pagination
            var records = _unitOfWork.Repository<Department>().GetAll;

            var recordsTotal = records.Count();

            records = records.Where(d =>
                    d.Id.ToString().Trim().Contains(searchValue)
                    || d.DepartmentName.Trim().ToLower().Contains(searchValue)
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
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.DepartmentName) : records.OrderByDescending(r => r.DepartmentName);
                        break;
                    case (3):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.CreatedBy) : records.OrderByDescending(r => r.CreatedBy);
                        break;
                    case (4):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.CreatedDate) : records.OrderByDescending(r => r.CreatedDate);
                        break;
                    case (5):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.UpdatedBy) : records.OrderByDescending(r => r.UpdatedBy);
                        break;
                    case (6):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.UpdatedDate) : records.OrderByDescending(r => r.UpdatedDate);
                        break;
                    case (7):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.IsDeleted) : records.OrderByDescending(r => r.IsDeleted);
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
            response.Data = await records.ToListAsync();

            return response;
        }

        public async Task<ApiResponse> Delete(int id)
        {
            var department = await _unitOfWork.Repository<Department>().GetByIdAsync(id);

            if (department.IsDeleted) throw new Exception("Resource has been deleted");

            if (department.Doctors.Count != 0)
            {
                throw new Exception("You cannot delete a department that already has a doctor attached to it");
            }

            _unitOfWork.BeginTransaction();
            try
            {
                int deletedId = await _unitOfWork.Repository<Department>().DeleteByIdAsync(id);
                _unitOfWork.Commit();
                return new ApiResponse
                {
                    Id = deletedId.ToString(),
                    IsSuccess = true,
                    Message = $"You just deleted {department.DepartmentName}"
                };
            }
            catch
            {
                _unitOfWork.Rollback();
                throw;
            }
        }

        public async Task<ApiResponse> Restore(int id)
        {
            _unitOfWork.BeginTransaction();
            try
            {
                var department = await _unitOfWork.Repository<Department>().GetByIdAsync(id);
                department.IsDeleted = false;

                _unitOfWork.Commit();
                return new ApiResponse
                {
                    Id = department.Id.ToString(),
                    IsSuccess = true,
                    Message = $"You just restore {department.DepartmentName}"
                };
            }
            catch
            {
                _unitOfWork.Rollback();
                throw;
            }

        }

        public async Task<ApiResponse> Update(int id, UpdateDepartmentDto model)
        {
            _unitOfWork.BeginTransaction();
            try
            {
                var exist = await _unitOfWork.Repository<Department>().GetByIdAsync(id);
                exist.DepartmentName = model.DepartmentName;
                _unitOfWork.Commit();
                return new ApiResponse
                {
                    Id = exist.Id.ToString(),
                    IsSuccess = true,
                    Message = "Updated department successfully"
                };
            }
            catch
            {
                _unitOfWork.Rollback();
                throw;
            }
        }

        public async Task<List<DepartmentToOptiontDto>> GetDepartmentToSelect()
        {
            var result = _unitOfWork.Repository<Department>().GetAll
                .Select(d => new DepartmentToOptiontDto
                    {
                        Id = d.Id,
                        DepartmentName = d.DepartmentName
                    })
                .ToListAsync();
            return await result;
        }
    }
}
