using FluentValidation;
using WebAPI.Models;

namespace WebAPI.Validators
{
    public class RegisterModelValidator : AbstractValidator<RegisterModel>
    {
        public RegisterModelValidator()
        {
            RuleFor(m => m.Username)
                .NotEmpty()
                .WithMessage("Please enter your username");
            RuleFor(m => m.Password)
                .NotEmpty()
                .WithMessage("Please enter your password")
                .MinimumLength(8)
                .WithMessage("Password must be 8-50 characters")
                .MaximumLength(50)
                .WithMessage("Password must be 8-50 characters");
        }
    }
}
