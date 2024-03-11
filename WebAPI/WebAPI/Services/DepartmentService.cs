using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebAPI.Domain.Entities;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Interfaces.IService;
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

        public async Task<ApiResponse> Delete(int id)
        {
            var department = await _unitOfWork.Repository<Department>().GetByIdAsync(id);
            if(department.Doctors.Count != 0)
            {
                throw new Exception("You cannot delete a department that already has a doctor attached to it");
            }
            int deletedId = await _unitOfWork.Repository<Department>().DeleteByIdAsync(id);

            return new ApiResponse();
        }
    }
}
