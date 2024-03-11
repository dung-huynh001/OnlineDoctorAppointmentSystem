using WebAPI.Domain.Entities;
using WebAPI.DTOs;
using WebAPI.Responses;

namespace WebAPI.Interfaces.IService
{
    public interface IDepartmentService
    {
        Task<ApiResponse> Create(CreateDepartmentDto model);
        Task<List<Department>> GetAll();
    }
}
