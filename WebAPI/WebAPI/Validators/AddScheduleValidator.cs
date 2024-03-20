using FluentValidation;
using WebAPI.DTOs;

namespace WebAPI.Validators
{
    public class AddScheduleValidator : AbstractValidator<CreateScheduleDto>
    {
        public AddScheduleValidator()
        {
            /*RuleFor(s => s.DoctorId)
                .NotEmpty()
                .GreaterThan(1)
                .WithMessage("Cannot found doctor to matched");
            RuleFor(s => s.ShiftTime)
                .NotEmpty()
                .LessThan(s => s.BreakTime)
                .WithMessage("Invalid start time");
            RuleFor(s => s.BreakTime)
                .NotEmpty()
                .GreaterThan(s => s.ShiftTime)
                .WithMessage("Invalid end time");
            RuleFor(s => s.ConsultantTime)
                .NotEmpty();
            RuleFor(s => s.WorkingDay)
                .NotEmpty()
                .GreaterThan(new DateTime().Date)
                .WithMessage("It is not possible to set a schedule for the current period");*/
        }
    }
}
