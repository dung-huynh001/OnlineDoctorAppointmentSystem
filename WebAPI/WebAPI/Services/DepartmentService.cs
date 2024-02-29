using AutoMapper;
using WebAPI.Domain.Entities;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Responses;

namespace WebAPI.Services
{
    public class DepartmentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DepartmentService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }

      /*  public async Task<ApiResponse> Create(CreateDepartmentDto model)
        {
            try
            {
                var department = _mapper.Map<CreateDepartmentDto, Department>(model);
                
            }
            catch
            {

            }
        }*/
    }
}
