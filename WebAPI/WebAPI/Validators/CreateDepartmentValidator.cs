using FluentValidation;
using WebAPI.Domain.Entities;
using WebAPI.DTOs;

namespace WebAPI.Validators
{
    public class CreateDepartmentValidator: AbstractValidator<CreateDepartmentDto>
    {
        public CreateDepartmentValidator()
        {
            RuleFor(p => p.DepartmentName)
                .NotEmpty()
                .WithMessage("Department name is require.");
        }
    }
}
