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
            CreateMap<CreateDoctorDto, Doctor>().ReverseMap();
            CreateMap<AddScheduleDto, Schedule>().ReverseMap();
            CreateMap<UpdateScheduleDto, Schedule>().ReverseMap();
            CreateMap<GetAppointmentDto, Appointment>().ReverseMap();
            CreateMap<GetAppointmentDto, Patient>().ReverseMap();
            CreateMap<GetAppointmentDto, Doctor>().ReverseMap();
            CreateMap<SchedulesOfDoctor, Schedule>().ReverseMap();
            CreateMap<GetSchedulesByDoctorIdDto, Doctor>()
                .ReverseMap()
                .ForMember(des => des.DoctorId, opt => opt.MapFrom(src => src.Id));
        }
    }
}
