using Microsoft.EntityFrameworkCore;
using WebAPI.Domain.Entities;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Interfaces.IService;

namespace WebAPI.Services
{
    public class StatisticService : IStatisticService
    {
        private readonly IUnitOfWork _unitOfWork;

        public StatisticService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }
        public Task<List<WidgetDto>> StatisticAppointmentWidgets(string userId, string userType)
        {
            List<WidgetDto> result = userType.ToLower().Trim() switch
            {
                "admin" => new List<WidgetDto>()
                {
                    GetTotalAppointmentsByStatus(userId, userType, "Pending"),
                    GetTotalAppointmentsByStatus(userId, userType, "Confirmed"),
                    GetTotalAppointmentsByStatus(userId, userType, "Completed"),
                    GetTotalAppointmentsByStatus(userId, userType, "Cancelled"),
                },
                _ => new List<WidgetDto>
                {
                    GetTotalAppointments(userId, userType),
                    GetTodayAppointments(userId, userType),
                    GetConfirmedAppointments(userId, userType),
                    GetPendingAppointments(userId, userType)
                }

            }; 

            return Task.FromResult(result);
        }

        public Task<List<WidgetDto>> StatisticResourceWidgets()
        {
            List<WidgetDto> result = new List<WidgetDto>
            {
                GetTotalDoctors(),
                GetTotalPatients(),
                GetTotalDepartments(),
                GetTotalAppointments(),
            };

            return Task.FromResult(result);
        }

        private WidgetDto GetTotalDoctors()
        {
            var result = new WidgetDto
            {
                CreatedDate = DateTime.Now,
                Title = "Doctors",
                Value = _unitOfWork.Repository<Doctor>().GetAll
                        .Where(a => !a.IsDeleted)
                        .Count(),
                Icon = "las la-user-nurse",
                Badge = "las la-user-nurse",
                ShortDesc = "",
            };
            return result;
        }

        private WidgetDto GetTotalDepartments()
        {
            var result = new WidgetDto
            {
                CreatedDate = DateTime.Now,
                Title = "Departments",
                Value = _unitOfWork.Repository<Department>().GetAll
                        .Where(a => !a.IsDeleted)
                        .Count(),
                Icon = "mdi mdi-hospital-building",
                Badge = "mdi mdi-hospital-building",
                ShortDesc = "",
            };
            return result;
        }

        private WidgetDto GetTotalPatients()
        {
            var result = new WidgetDto
            {
                CreatedDate = DateTime.Now,
                Title = "Patients",
                Value = _unitOfWork.Repository<Patient>().GetAll
                        .Where(a => !a.IsDeleted)
                        .Count(),
                Icon = "ri ri-hotel-bed-line",
                ShortDesc = "",
            };
            return result;
        }

        private WidgetDto GetTotalAppointments()
        {
            var result = new WidgetDto
            {
                CreatedDate = DateTime.Now,
                Title = "Total Appointments",
                Value = _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted)
                        .Count(),
                ShortDesc = "till today",
                Icon = "las la-list-ul"
            };
            return result;
        }

        private WidgetDto GetTotalAppointments(string id, string userType)
        {
            var result = new WidgetDto
            {
                CreatedDate = DateTime.Now,
                Title = "Total Appointments",
                Value = userType.ToLower().Trim() switch
                {
                    "patient" => _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.Patient.UserId == id)
                        .Count(),
                    "doctor" => _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.Doctor.UserId == id)
                        .Count(),
                    _ => _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted)
                        .Count(),
                },
                Icon = "las la-list-ul",
                Badge = "las la-list-ul",
                BadgeClass = "bg-info-subtle text-info",
                ShortDesc = "till today",
            };
            return result;
        }

        private WidgetDto GetTotalAppointmentsByStatus(string userId, string userType, string statusCapitalize)
        {
            int previousMonthData = userType.ToLower().Trim() switch
            {
                "pending" => _unitOfWork.Repository<Appointment>().GetAll
                    .Where(a => !a.IsDeleted)
                    .Count(),
                "confirmed" => _unitOfWork.Repository<Appointment>().GetAll
                    .Where(a => !a.IsDeleted)
                    .Count(),
                "completed" => _unitOfWork.Repository<Appointment>().GetAll
                    .Where(a => !a.IsDeleted)
                    .Count(),
                "cancelled" => _unitOfWork.Repository<Appointment>().GetAll
                    .Where(a => !a.IsDeleted)
                    .Count(),
                "total" => _unitOfWork.Repository<Appointment>().GetAll
                                    .Where(a => !a.IsDeleted)
                                    .Count(),
                _ => _unitOfWork.Repository<Appointment>().GetAll
                    .Where(a => !a.IsDeleted)
                    .Count(),
            };

            switch (userType.ToLower().Trim())
            {
                case "patient": 
                    previousMonthData = userType.ToLower().Trim() switch
                    {
                        "today" => _unitOfWork.Repository<Appointment>().GetAll
                            .Where(a => !a.IsDeleted
                            && a.AppointmentDate!.Value == DateTime.Now.AddDays(-1)
                            && a.Patient.UserId == userId)
                            .Count(),
                        "total" => _unitOfWork.Repository<Appointment>().GetAll
                            .Where(a => !a.IsDeleted
                            && a.AppointmentDate!.Value.Month <= DateTime.Now.AddMonths(-1).Month
                            && a.AppointmentDate!.Value.Year <= DateTime.Now.AddMonths(-1).Year
                            && a.Patient.UserId == userId)
                            .Count(),
                        _ => _unitOfWork.Repository<Appointment>().GetAll
                            .Where(a => !a.IsDeleted
                            && a.AppointmentStatus.ToLower().Trim() == statusCapitalize.ToLower()
                            && a.AppointmentDate!.Value.Month <= DateTime.Now.AddMonths(-1).Month
                            && a.AppointmentDate!.Value.Year <= DateTime.Now.AddMonths(-1).Year
                            && a.Patient.UserId == userId)
                            .Count()
                    };
                    break;
                case "doctor":
                    previousMonthData = userType.ToLower().Trim() switch
                    {
                        "today" => _unitOfWork.Repository<Appointment>().GetAll
                            .Where(a => !a.IsDeleted
                            && a.AppointmentDate!.Value == DateTime.Now.AddDays(-1)
                            && a.Doctor.UserId == userId)
                            .Count(),
                        "total" => _unitOfWork.Repository<Appointment>().GetAll
                            .Where(a => !a.IsDeleted
                            && a.AppointmentDate!.Value.Month <= DateTime.Now.AddMonths(-1).Month
                            && a.AppointmentDate!.Value.Year <= DateTime.Now.AddMonths(-1).Year
                            && a.Doctor.UserId == userId)
                            .Count(),
                        _ => _unitOfWork.Repository<Appointment>().GetAll
                            .Where(a => !a.IsDeleted
                            && a.AppointmentStatus.ToLower().Trim() == statusCapitalize.ToLower()
                            && a.AppointmentDate!.Value.Month <= DateTime.Now.AddMonths(-1).Month
                            && a.AppointmentDate!.Value.Year <= DateTime.Now.AddMonths(-1).Year
                            && a.Doctor.UserId == userId)
                            .Count()
                    };
                    break;
                default:
                    previousMonthData = userType.ToLower().Trim() switch
                    {
                        "today" => _unitOfWork.Repository<Appointment>().GetAll
                            .Where(a => !a.IsDeleted
                            && a.AppointmentDate!.Value == DateTime.Now.AddDays(-1))
                            .Count(),
                        "total" => _unitOfWork.Repository<Appointment>().GetAll
                            .Where(a => !a.IsDeleted
                            && a.AppointmentDate!.Value.Month == DateTime.Now.AddMonths(-1).Month
                            && a.AppointmentDate!.Value.Year == DateTime.Now.AddMonths(-1).Year)
                            .Count(),
                        _ => _unitOfWork.Repository<Appointment>().GetAll
                            .Where(a => !a.IsDeleted
                            && a.AppointmentStatus.ToLower().Trim() == statusCapitalize.ToLower()
                            && a.AppointmentDate!.Value.Month == DateTime.Now.AddMonths(-1).Month
                            && a.AppointmentDate!.Value.Year == DateTime.Now.AddMonths(-1).Year)
                            .Count()
                    };
                    break;
            }

            var widget = new WidgetDto
            {
                CreatedDate = DateTime.Now,
                Title = $"{statusCapitalize} Appointments",
                Value = userType.ToLower().Trim() switch
                {
                    "patient" => _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted 
                        && a.Patient.UserId == userId 
                        && a.AppointmentStatus.ToLower() == statusCapitalize.ToLower()
                        && a.AppointmentDate!.Value.Month == DateTime.Now.Month
                            && a.AppointmentDate!.Value.Year == DateTime.Now.Year)
                        .Count(),
                    "doctor" => _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted 
                        && a.Doctor.UserId == userId 
                        && a.AppointmentStatus.ToLower() == statusCapitalize.ToLower() 
                        && a.AppointmentDate!.Value.Month == DateTime.Now.Month
                        && a.AppointmentDate!.Value.Year == DateTime.Now.Year)
                        .Count(),
                    _ => _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted 
                        && a.AppointmentStatus.ToLower() == statusCapitalize.ToLower()
                        && a.AppointmentDate!.Value.Month == DateTime.Now.Month
                        && a.AppointmentDate!.Value.Year == DateTime.Now.Year)
                        .Count(),
                },
                ShortDesc = statusCapitalize.ToLower() switch
                {
                    "pending" => "are waiting approval",
                    "confirmed" => "were approval",
                    "completed" => "finished",
                    "cancelled" => "were cancelled",
                    "total" => "till today",
                    _ => DateTime.Now.ToString("MMM dd yyyy")
                },
                Badge = "las la-calendar-plus",
                BadgeClass = "bg-primary-subtle text-primary",
                Icon = "las la-calendar-plus",
            };

            switch (statusCapitalize.ToLower())
            {
                case "pending":
                    widget.ShortDesc = "are waiting approval";
                    widget.Icon = "las la-hourglass-half";
                    widget.Badge = "las la-hourglass-half";
                    widget.BadgeClass = "bg-warning-subtle text-warning";
                    break;
                case "confirmed":
                    widget.ShortDesc = "were approval";
                    widget.Icon = "las la-calendar-plus";
                    widget.Badge = "las la-calendar-plus";
                    widget.BadgeClass = "bg-primary-subtle text-primary";
                    break;
                case "completed":
                    widget.ShortDesc = "finished";
                    widget.Icon = "las la-calendar-check";
                    widget.Badge = "las la-calendar-check";
                    widget.BadgeClass = "bg-success-subtle text-success";
                    break;
                case "cancelled":
                    widget.ShortDesc = "were cancelled";
                    widget.Icon = "las la-calendar-times";
                    widget.Badge = "las la-calendar-times";
                    widget.BadgeClass = "bg-danger-subtle text-danger";
                    break;
                case "total":
                    widget.ShortDesc = "till today";
                    widget.Icon = "las la-list-ul";
                    widget.Badge = "las la-list-ul";
                    widget.BadgeClass = "bg-info-subtle text-info";
                    break;
                default:
                    widget.ShortDesc = DateTime.Now.ToString("MMM dd yyyy");
                    widget.Icon = "las la-calendar-day";
                    widget.Badge = "las la-calendar-day";
                    widget.BadgeClass = "bg-success-subtle text-sucess";
                    break;
            }

            if(previousMonthData != 0)
            {
                widget.IncreaseValue = Math.Round((Double)(widget.Value - previousMonthData) / previousMonthData * 100, 2);
                
            }

            widget.IsIncrease = previousMonthData <= widget.Value;

            return widget;
        }

        private WidgetDto GetTodayAppointments(string id, string userType)
        {
            var result = new WidgetDto
            {
                CreatedDate = DateTime.Now,
                Title = "Today Appointments",
                Value = userType.ToLower().Trim() switch
                {
                    "patient" => _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.Patient.UserId == id && a.AppointmentDate!.Value.Date.Equals(DateTime.Now.Date))
                        .Count(),
                    "doctor" => _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.Doctor.UserId == id && a.AppointmentDate!.Value.Date.Equals(DateTime.Now.Date))
                        .Count(),
                    _ => _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.AppointmentDate!.Value.Date.Equals(DateTime.Now.Date))
                        .Count(),
                },
                ShortDesc = DateTime.Now.ToString("MMM dd yyyy"),
                Badge = "las la-calendar-day",
                BadgeClass = "bg-success-subtle text-success",
                Icon = "las la-calendar-day"
            };
            return result;
        }

        private WidgetDto GetConfirmedAppointments(string id, string userType)
        {
            var result = new WidgetDto
            {
                CreatedDate = DateTime.Now,
                Title = "Confirmed Appointments",
                Value = userType.ToLower().Trim() switch
                {
                    "patient" => _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.Patient.UserId == id && a.AppointmentStatus.ToLower() == "confirmed")
                        .Count(),
                    "doctor" => _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.Doctor.UserId == id && a.AppointmentStatus.ToLower() == "confirmed")
                        .Count(),
                    _ => _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.AppointmentStatus.ToLower() == "confirmed")
                        .Count(),
                },
                ShortDesc = "were approved",
                Badge = "las la-calendar-plus",
                BadgeClass = "bg-primary-subtle text-primary",
                Icon = "las la-calendar-plus",
            };
            return result;
        }

        private WidgetDto GetPendingAppointments(string id, string userType)
        {
            var result = new WidgetDto
            {
                CreatedDate = DateTime.Now,
                Title = "Pending Appointments",
                Value = userType.ToLower().Trim() switch
                {
                    "patient" => _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.Patient.UserId == id && a.AppointmentStatus.ToLower() == "pending")
                        .Count(),
                    "doctor" => _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.Doctor.UserId == id && a.AppointmentStatus.ToLower() == "pending")
                        .Count(),
                    _ => _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.AppointmentStatus.ToLower() == "pending")
                        .Count(),
                },
                ShortDesc = "are awaiting approval",
                Badge = "las la-hourglass-half",
                BadgeClass = "bg-warning-subtle text-warning",
                Icon = "las la-hourglass-half",
            };
            return result;
        }

        private WidgetDto GetCompletedAppointments(string id, string userType)
        {
            var result = new WidgetDto
            {
                CreatedDate = DateTime.Now,
                Title = "Completed Appointments",
                Value = userType.ToLower().Trim() switch
                {
                    "patient" => _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.Patient.UserId == id && a.AppointmentStatus.ToLower() == "completed")
                        .Count(),
                    "doctor" => _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.Doctor.UserId == id && a.AppointmentStatus.ToLower() == "completed")
                        .Count(),
                    _ => _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.AppointmentStatus.ToLower() == "completed")
                        .Count(),
                },
                ShortDesc = "were complete",
                Badge = "las la-calendar-check",
                BadgeClass = "bg-success-subtle text-success",
                Icon = "las la-calendar-check",
            };
            return result;
        }

        private WidgetDto GetCancelledAppointments(string id, string userType)
        {
            var result = new WidgetDto
            {
                CreatedDate = DateTime.Now,
                Title = "Cancelled Appointments",
                Value = userType.ToLower().Trim() switch
                {
                    "patient" => _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.Patient.UserId == id && a.AppointmentStatus.ToLower() == "cancelled")
                        .Count(),
                    "doctor" => _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.Doctor.UserId == id && a.AppointmentStatus.ToLower() == "cancelled")
                        .Count(),
                    _ => _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.AppointmentStatus.ToLower() == "cancelled")
                        .Count(),
                },
                ShortDesc = "were cancel",
                Badge = "las la-calendar-times",
                BadgeClass = "bg-danger-subtle text-danger",
                Icon = "las la-calendar-times"
            };
            return result;
        }

        public Task<List<WidgetDto>> StatisticGenderOfPatient()
        {
            throw new NotImplementedException();
        }
    }
}
