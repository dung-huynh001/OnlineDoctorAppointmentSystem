using FluentValidation;
using WebAPI.DTOs;

namespace WebAPI.Validators
{
    public class CreateDoctorValidator : AbstractValidator<CreateDoctorDto>
    {
        public CreateDoctorValidator()
        {
            /*RuleFor(d => d.UserId)
                .NotEmpty();
            RuleFor(d => d.PhoneNumber)
                .NotEmpty();
            RuleFor(d => d.FullName)
                .NotEmpty();
            RuleFor(d => d.Department)
                .NotEmpty();
            RuleFor(d => d.NationalId)
                .NotEmpty();
            RuleFor(d => d.Speciality)
                .NotEmpty();*/
        }
    }
}
