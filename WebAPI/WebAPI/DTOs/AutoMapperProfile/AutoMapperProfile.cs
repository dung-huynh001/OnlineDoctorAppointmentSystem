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
            CreateMap<GetAppointmentDetailDto, Appointment>().ReverseMap();
            CreateMap<GetAppointmentDetailDto, Patient>().ReverseMap();
            CreateMap<GetAppointmentDetailDto, Doctor>().ReverseMap();
            CreateMap<SchedulesOfDoctor, Schedule>().ReverseMap();
            CreateMap<GetSchedulesByDoctorIdDto, Doctor>()
                .ReverseMap()
                .ForMember(des => des.DoctorId, opt => opt.MapFrom(src => src.Id));
            CreateMap<GetAppointmentDetailDto, Appointment>().ReverseMap();
            CreateMap<UpdateDepartmentDto, Department>().ReverseMap();
            CreateMap<DepartmentToOptiontDto, Department>().ReverseMap();
            CreateMap<DepartmentToOptiontDto, Department>().ReverseMap();
            CreateMap<CreateDoctorDto, RegisterModel>().ReverseMap();
            CreateMap<GetDoctorToDrawTableDto, Doctor>().ReverseMap()
                .ForMember(des => des.Department, opt => opt.MapFrom(src => src.Department.DepartmentName))
                .ForMember(des => des.Email, opt => opt.MapFrom(src => src.User.Email))
                .ForMember(des => des.Gender, opt => opt.MapFrom((src, des) =>
                {
                    switch (src.Gender)
                    {
                        case 0:
                            return "Male";
                        case 1:
                            return "Female";
                        default:
                            return "Other";
                    }
                }));

        }
    }
}
