using FluentValidation;
using WebAPI.Models;

namespace WebAPI.Validators
{
    public class LoginModelValidator : AbstractValidator<LoginModel>
    {
        public LoginModelValidator()
        {
            RuleFor(m => m.Username)
                .NotEmpty()
                .WithMessage("Please enter your username.");
            RuleFor(m => m.Password)
                .NotEmpty()
                .WithMessage("Please enter your password.");
        }
    }
}
