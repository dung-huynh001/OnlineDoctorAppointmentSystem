using WebAPI.DTOs;

namespace WebAPI.Models
{
    public class CreateDoctorAccount
    {
        public CreateDoctorDto DoctorInfo { get; set; }
        public RegisterModel Account { get; set; }
    }
}
