using WebAPI.Domain.Entities;
using WebAPI.DTOs;
using WebAPI.Models;
using WebAPI.Responses;

namespace WebAPI.Interfaces.IService
{
    public interface IDoctorService
    {
        Task<DatatableResponse<DoctorTableDto>> GetAll(DataTablesParameters parameters);
        Task<List<DoctorOnDutyDto>> GetDoctorsOnDuty(DateTime dateTime);
        Task<bool> Create(CreateDoctorDto doctor);
        Task<DoctorDetailsDto> GetDoctorDetails(int id);
        Task<DoctorDetailsDto> GetDoctorDetailsByUserId(string id);
        Task<bool> UpdateDoctor(DoctorInfoDto data);
        Task<ApiResponse> UpdateContract(ContractDto data);
    }
}
