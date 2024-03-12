using WebAPI.Domain.Entities;
using WebAPI.DTOs;
using WebAPI.Models;
using WebAPI.Responses;

namespace WebAPI.Interfaces.IService
{
    public interface IDepartmentService
    {
        Task<ApiResponse> Create(CreateDepartmentDto model);
        Task<List<Department>> GetAll();
        Task<DatatableResponse<Department>> Get(DataTablesParameters parameters);
        Task<ApiResponse> Delete(int id);
        Task<ApiResponse> Update(int id, UpdateDepartmentDto department);
        Task<ApiResponse> Restore(int id);
    }
}
