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
            CreateMap<UpdateScheduleDto, Schedule>().ReverseMap();
            CreateMap<AppointmentDetailDto, Appointment>().ReverseMap();
            CreateMap<AppointmentDetailDto, Patient>().ReverseMap();
            CreateMap<AppointmentDetailDto, Doctor>().ReverseMap();
            CreateMap<SchedulesOfDoctor, Schedule>().ReverseMap();
            CreateMap<AppointmentDetailDto, Appointment>().ReverseMap();
            CreateMap<UpdateDepartmentDto, Department>().ReverseMap();
            CreateMap<DepartmentToOptiontDto, Department>().ReverseMap();
            CreateMap<DepartmentToOptiontDto, Department>().ReverseMap();
            CreateMap<CreateDoctorDto, RegisterModel>().ReverseMap();
            CreateMap<DepartmentTableDto, Department>().ReverseMap();
            CreateMap<AddNewPatientDto, RegisterModel>().ReverseMap();
            CreateMap<AddNewPatientDto, Patient>().ReverseMap();
            CreateMap<PrescriptionDto, Prescription>().ReverseMap();

            CreateMap<MakeAppointmentDto, Appointment>().ReverseMap();

            CreateMap<ViewAppointmentDto, Appointment>().ReverseMap()
                .ForMember(des => des.PatientName, opt => opt.MapFrom(src => src.Patient.FullName))
                .ForMember(des => des.PatientBirthDay, opt => opt.MapFrom(src => src.Patient.DateOfBirth))
                .ForMember(des => des.PatientPhoneNumber, opt => opt.MapFrom(src => src.Patient.PhoneNumber))
                .ForMember(des => des.PatientGender, opt => opt.MapFrom(src => src.Patient.Gender))
                .ForMember(des => des.PatientEmail, opt => opt.MapFrom(src => src.Patient.User.Email))
                .ForMember(des => des.PatientAddress, opt => opt.MapFrom(src => src.Patient.Address))
                .ForMember(des => des.DoctorName, opt => opt.MapFrom(src => src.Doctor.FullName))
                .ForMember(des => des.Speciality, opt => opt.MapFrom(src => src.Doctor.Speciality))
                .ForMember(des => des.DoctorGender, opt => opt.MapFrom(src => src.Doctor.Gender))
                .ForMember(des => des.DoctorEmail, opt => opt.MapFrom(src => src.Doctor.User.Email))
                .ForMember(des => des.DoctorAvatarUrl, opt => opt.MapFrom(src => src.Doctor.User.AvatarUrl));

            CreateMap<DoctorTableDto, Doctor>().ReverseMap()
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
