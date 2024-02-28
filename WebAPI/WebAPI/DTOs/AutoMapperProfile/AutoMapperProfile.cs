using AutoMapper;
using WebAPI.Models;

namespace WebAPI.DTOs.AutoMapperProfile
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<DoctorOnDutyDto, DoctorModel>().ReverseMap();
        }
    }
}
