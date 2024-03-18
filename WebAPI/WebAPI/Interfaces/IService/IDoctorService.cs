using WebAPI.Domain.Entities;
using WebAPI.DTOs;
using WebAPI.Models;
using WebAPI.Responses;

namespace WebAPI.Interfaces.IService
{
    public interface IDoctorService
    {
        Task<DatatableResponse<GetDoctorToDrawTableDto>> GetAll(DataTablesParameters parameters);
        Task<List<DoctorOnDutyDto>> GetDoctorListOnDuty(DateTime dateTime);
        Task<bool> Create(CreateDoctorDto doctor);
        Task<DoctorDetailsDto> GetDoctorDetails(int id);
        Task<bool> UpdatePersonalInfo(DoctorPersonalInfo data);
        Task<ApiResponse> UpdateWorkInfo(WorkInfoDto data);
    }
}
