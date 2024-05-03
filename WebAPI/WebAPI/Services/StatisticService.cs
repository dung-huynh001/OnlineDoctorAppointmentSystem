using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System.Drawing;
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

        public async Task<List<GenderStatisticDto>> StatisticGender()
        {
            var patients = await _unitOfWork.Repository<Patient>()
                .GetAll
                .Where(p => !p.IsDeleted)
                .Select(p => new
                {
                    Gender = p.Gender
                })
                .OrderBy(p => p.Gender)
                .ToListAsync(); 

            int total = patients.Count();

            var genderCounts = patients.GroupBy(p => p.Gender)
                .Select(group => new
                {
                    Gender = group.Key,
                    Count = group.Count()
                })
                .ToList();

            var result = genderCounts.Select(genderCount => new GenderStatisticDto
            { 
                Title = genderCount.Gender == 0 ? "Male" : (genderCount.Gender == 1 ? "Female" : "Others"),
                Percentage = Math.Round((double)genderCount.Count / total * 100, 2),
                Suffix = "%",
                Value = genderCount.Count,
                Color = genderCount.Gender == 0 ? "#5ea3cb" : (genderCount.Gender == 1 ? "#58caea" : "#6ada7d"),
                Icon = genderCount.Gender == 0 ? "las la-mars" : (genderCount.Gender == 1 ? "las la-venus" : "las la-transgender"),
            }).ToList();

            return result;
        }

        private async Task<AppointmentStatisticResponse> StatisticTodayAppointment(AppointmentStatisticRequest request)
        {
            DateTime currentDate = DateTime.Today;

            var appointments = await _unitOfWork.Repository<Appointment>().GetAll
                    .Where(a => !a.IsDeleted && a.AppointmentDate!.Value.Date == currentDate.Date)
                    .Select(a => new
                    {
                        Status = a.AppointmentStatus,
                        Hour = a.AppointmentDate!.Value.Hour,
                    })
                    .OrderBy(a => a.Status)
                    .ToListAsync();

            var xAxis = new LineChartXAxis
            {
                Title = new AxisTitle { Text = "Hours" },
                Categories = Enumerable.Range(7, 17).Select(hour => hour.ToString("00") + ":00").ToList()
            };

            var series = new List<LineChartSerie>
            {
                new LineChartSerie { Name = "Pending Appointment", Data = new List<int>() },
                new LineChartSerie { Name = "Confirmed Appointment", Data = new List<int>() },
                new LineChartSerie { Name = "Completed Appointment", Data = new List<int>() },
                new LineChartSerie { Name = "Cancelled Appointment", Data = new List<int>() }
            };

            foreach (var hour in Enumerable.Range(7, 17))
            {
                series[0].Data.Add(appointments.Count(ac => ac.Status.ToLower() == "pending" && ac.Hour == hour));
                series[1].Data.Add(appointments.Count(ac => ac.Status.ToLower() == "confirmed" && ac.Hour == hour));
                series[2].Data.Add(appointments.Count(ac => ac.Status.ToLower() == "completed" && ac.Hour == hour));
                series[3].Data.Add(appointments.Count(ac => ac.Status.ToLower() == "cancelled" && ac.Hour == hour));
            }

            int maxAppt = series.Max(s => s.Data.Max());

            var result = new AppointmentStatisticResponse
            {
                Colors = new List<string> { "#f7b84b", "#5ea3cb", "#6ada7d", "#fa896b" },
                Xaxis = xAxis,
                Series = series,
                Yaxis = new LineChartYAxis
                {
                    Title = new AxisTitle { Text = "Appointment" },
                    Max = maxAppt + 2,
                    Min = 0,
                    Floating = false,
                },
            };

            return result;
        }




        public async Task<AppointmentStatisticResponse> StatisticThisWeekAppointment(AppointmentStatisticRequest request)
        {
            DateTime currentDate = DateTime.Today;
            DateTime startDayOfWeek = currentDate.AddDays(-(int)currentDate.DayOfWeek);
            DateTime endDayOfWeek = startDayOfWeek.AddDays(6);           

            var appointments = await _unitOfWork.Repository<Appointment>().GetAll
                    .Where(a => !a.IsDeleted 
                    && a.AppointmentDate!.Value.Date >= startDayOfWeek.Date
                    && a.AppointmentDate!.Value.Date <= endDayOfWeek.Date)
                    .Select(a => new
                    {
                        Status = a.AppointmentStatus,
                        Date = a.AppointmentDate!.Value.Date,
                    })
                    .OrderBy(a => a.Status)
                    .ToListAsync();

            var xAxis = new LineChartXAxis
            {
                Title = new AxisTitle { Text = "Day" },
                Categories = new List<string>(),
            };

            var series = new List<LineChartSerie>
            {
                new LineChartSerie { Name = "Pending Appointment", Data = new List<int>() },
                new LineChartSerie { Name = "Confirmed Appointment", Data = new List<int>() },
                new LineChartSerie { Name = "Completed Appointment", Data = new List<int>() },
                new LineChartSerie { Name = "Cancelled Appointment", Data = new List<int>() }
            };

            for (DateTime day = startDayOfWeek; day <= endDayOfWeek; day = day.AddDays(1))
            {
                xAxis.Categories.Add(day.ToString("dd(ddd)"));
                series[0].Data.Add(appointments.Count(ac => ac.Status.ToLower() == "pending" && ac.Date == day.Date));
                series[1].Data.Add(appointments.Count(ac => ac.Status.ToLower() == "confirmed" && ac.Date == day.Date));
                series[2].Data.Add(appointments.Count(ac => ac.Status.ToLower() == "completed" && ac.Date == day.Date));
                series[3].Data.Add(appointments.Count(ac => ac.Status.ToLower() == "cancelled" && ac.Date == day.Date));
            }

            int maxAppt = series.Max(s => s.Data.Max());

            var result = new AppointmentStatisticResponse
            {
                Colors = new List<string> { "#f7b84b", "#5ea3cb", "#6ada7d", "#fa896b" },
                Xaxis = xAxis,
                Series = series,
                Yaxis = new LineChartYAxis
                {
                    Title = new AxisTitle { Text = "Appointment" },
                    Max = maxAppt + 2,
                    Min = 0,
                    Floating = false,
                },
            };

            return result;
        }

        public async Task<AppointmentStatisticResponse> StatisticThisMonthAppointment(AppointmentStatisticRequest request)
        {
            DateTime currentDate = DateTime.Now;

            // Get the first and last days of the current month
            DateTime startDayOfMonth = new DateTime(currentDate.Year, currentDate.Month, 1);
            DateTime endDayOfMonth = startDayOfMonth.AddMonths(1).AddDays(-1);

            var appointments = await _unitOfWork.Repository<Appointment>().GetAll
                    .Where(a => !a.IsDeleted
                    && a.AppointmentDate!.Value.Date >= startDayOfMonth.Date
                    && a.AppointmentDate!.Value.Date <= endDayOfMonth.Date)
                    .Select(a => new
                    {
                        Status = a.AppointmentStatus,
                        Date = a.AppointmentDate!.Value.Date,
                    })
                    .OrderBy(a => a.Status)
                    .ToListAsync();

            var xAxis = new LineChartXAxis
            {
                Title = new AxisTitle { Text = "Day" },
                Categories = new List<string>(),
            };

            var series = new List<LineChartSerie>
            {
                new LineChartSerie { Name = "Pending Appointment", Data = new List<int>() },
                new LineChartSerie { Name = "Confirmed Appointment", Data = new List<int>() },
                new LineChartSerie { Name = "Completed Appointment", Data = new List<int>() },
                new LineChartSerie { Name = "Cancelled Appointment", Data = new List<int>() }
            };

            for (DateTime day = startDayOfMonth; day <= endDayOfMonth; day = day.AddDays(1))
            {
                xAxis.Categories.Add(day.ToString("dd"));
                series[0].Data.Add(appointments.Count(ac => ac.Status.ToLower() == "pending" && ac.Date == day.Date));
                series[1].Data.Add(appointments.Count(ac => ac.Status.ToLower() == "confirmed" && ac.Date == day.Date));
                series[2].Data.Add(appointments.Count(ac => ac.Status.ToLower() == "completed" && ac.Date == day.Date));
                series[3].Data.Add(appointments.Count(ac => ac.Status.ToLower() == "cancelled" && ac.Date == day.Date));
            }

            int maxAppt = series.Max(s => s.Data.Max());

            var result = new AppointmentStatisticResponse
            {
                Colors = new List<string> { "#f7b84b", "#5ea3cb", "#6ada7d", "#fa896b" },
                Xaxis = xAxis,
                Series = series,
                Yaxis = new LineChartYAxis
                {
                    Title = new AxisTitle { Text = "Appointment" },
                    Max = maxAppt + 2,
                    Min = 0,
                    Floating = false,
                },
            };

            return result;
        }

        public async Task<AppointmentStatisticResponse> StatisticAppointmentByDate(AppointmentStatisticRequest request)
        {
            request.From = request.From.ToLocalTime();
            request.To = request.To.ToLocalTime();

            var appointments = await _unitOfWork.Repository<Appointment>().GetAll
                    .Where(a => !a.IsDeleted
                    && a.AppointmentDate!.Value.Date >= request.From.Date
                    && a.AppointmentDate!.Value.Date <= request.To.Date)
                    .Select(a => new
                    {
                        Status = a.AppointmentStatus,
                        Date = a.AppointmentDate!.Value.Date,
                    })
                    .OrderBy(a => a.Status)
                    .ToListAsync();

            var xAxis = new LineChartXAxis
            {
                Title = new AxisTitle { Text = "Day" },
                Categories = new List<string>(),
            };

            var series = new List<LineChartSerie>
            {
                new LineChartSerie { Name = "Pending Appointment", Data = new List<int>() },
                new LineChartSerie { Name = "Confirmed Appointment", Data = new List<int>() },
                new LineChartSerie { Name = "Completed Appointment", Data = new List<int>() },
                new LineChartSerie { Name = "Cancelled Appointment", Data = new List<int>() }
            };

            for (DateTime day = request.From; day <= request.To; day = day.AddDays(1))
            {
                xAxis.Categories.Add(day.ToString("dd"));
                series[0].Data.Add(appointments.Count(ac => ac.Status.ToLower() == "pending" && ac.Date == day.Date));
                series[1].Data.Add(appointments.Count(ac => ac.Status.ToLower() == "confirmed" && ac.Date == day.Date));
                series[2].Data.Add(appointments.Count(ac => ac.Status.ToLower() == "completed" && ac.Date == day.Date));
                series[3].Data.Add(appointments.Count(ac => ac.Status.ToLower() == "cancelled" && ac.Date == day.Date));
            }

            int maxAppt = series.Max(s => s.Data.Max());

            var result = new AppointmentStatisticResponse
            {
                Colors = new List<string> { "#f7b84b", "#5ea3cb", "#6ada7d", "#fa896b" },
                Xaxis = xAxis,
                Series = series,
                Yaxis = new LineChartYAxis
                {
                    Title = new AxisTitle { Text = "Appointment" },
                    Max = maxAppt + 2,
                    Min = 0,
                    Floating = false,
                },
            };

            return result;
        }

        public async Task<AppointmentStatisticResponse> StatisticAppointment(AppointmentStatisticRequest request)
        {
            switch (request.RenderBy.ToLower().Trim())
            {
                case "today":
                    return (await StatisticTodayAppointment(request));
                case "this week":
                    return (await StatisticThisWeekAppointment(request));
                case "this month":
                    return (await StatisticThisMonthAppointment(request));
                default:
                    return (await StatisticAppointmentByDate(request));
            }

        }
    }
}
