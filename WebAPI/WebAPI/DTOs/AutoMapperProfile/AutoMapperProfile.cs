using AutoMapper;
using WebAPI.Domain.Entities;
using WebAPI.Models;

namespace WebAPI.DTOs.AutoMapperProfile
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<DoctorOnDutyDto, DoctorModel>().ReverseMap();
            CreateMap<CreateDepartmentDto, Department>().ReverseMap();
        }
    }
}
