using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using WebAPI.Domain.Entities;
using WebAPI.Domain.Enums;
using WebAPI.DTOs;
using WebAPI.Exceptions;
using WebAPI.Interfaces;
using WebAPI.Interfaces.IService;
using WebAPI.Models;
using WebAPI.Responses;

namespace WebAPI.Services
{
    public class AppointmentService : IAppointmentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IMailService _mailService;
        private readonly ICurrentUserService _currentUserService;

        public AppointmentService(IUnitOfWork unitOfWork, IMapper mapper, IMailService mailService, ICurrentUserService currentUserService)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
            this._mailService = mailService;
            this._currentUserService = currentUserService;
        }
        public async Task<AppointmentDetailDto> GetAppointmentDetail(int id)
        {
            var result = await _unitOfWork.Repository<Appointment>().GetAll
                .Where(a => a.Id == id)
                .Include(a => a.Schedule.Doctor)
                .Include(a => a.Patient)
                .Select(a => _mapper.Map<AppointmentDetailDto>(a))
                .FirstOrDefaultAsync();
            if (result == null) throw new Exception();
            return result;
        }

        public async Task<AppointmentPatientDto> GetPatientDetailToAppointment(string currentUserId)
        {
            var patient = await _unitOfWork.Repository<Patient>().GetAll
                .Where(p => p.UserId.Equals(currentUserId))
                .Select(p => new AppointmentPatientDto
                {
                    PatientId = p.Id,
                    Address = p.Address!,
                    DateOfBirth = p.DateOfBirth,
                    Email = p.User.Email,
                    Gender = p.Gender,
                    PatientName = p.FullName!,
                    PhoneNumber = p.PhoneNumber!
                })
                .FirstOrDefaultAsync();
            if (patient == null) throw new NotFoundException("Patient", currentUserId);
            return patient;
        }

        public async Task<ApiResponse> MakeAppointment(MakeAppointmentDto model)
        {
            _unitOfWork.BeginTransaction();
            try
            {
                var appointment = _mapper.Map<Appointment>(model);
                appointment.AppointmentDate = model.AppointmentDate.Add(model.Time);
                appointment.DateOfConsultation = appointment.AppointmentDate.Value;

                await _unitOfWork.Repository<Appointment>().AddAsync(appointment);



                _unitOfWork.Commit();


                return new ApiResponse
                {
                    IsSuccess = true,
                    Message = "Make appointment successfully. You will be notified when you hear back from your doctor",
                };
            }
            catch
            {
                _unitOfWork.Rollback();
                return new ApiResponse
                {
                    IsSuccess = false,
                    Message = "Make appointment failed",
                };
            }
        }

        public async Task SendAppointmentConfirmMail(int doctorId, int patientId, string appointmentDate)
        {
            var doctor = await _unitOfWork.Repository<Doctor>().GetByIdAsync(doctorId);
            var patient = await _unitOfWork.Repository<Patient>().GetByIdAsync(patientId);

            var patientEmail = patient.User.Email;
            var doctorName = doctor.FullName;

            var formMail = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "EmailTemplates/ConfirmationAppointmentMailSample.htm"));
            formMail = formMail.Replace("#DoctorName#", doctor.FullName);
            formMail = formMail.Replace("#Speciality#", doctor.Speciality);
            formMail = formMail.Replace("#PatientName#", patient.FullName);
            formMail = formMail.Replace("#AppointmentDate#", appointmentDate);

            _ = Task.Run(() =>
            {
                _mailService.SendEmailAsync(new MailRequest
                {
                    ToEmail = patientEmail,
                    Body = formMail,
                    Subject = $"Appointment Confirmation with {doctorName} [CUSC - Online Doctor Appointment]"
                });
            });
        }

        public Task<DatatableResponse<AppointmentTableDto>> GetAppointments(string userId, string userType, string type, DataTablesParameters parameters)
        {
            var response = new DatatableResponse<AppointmentTableDto>();

            string status = GetStatus(type);
            int id = GetActorId(userId, userType);
            IQueryable<Appointment> appointments;
            if (status == "out-of-date")
            {
                appointments = _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted
                        && a.AppointmentStatus.ToLower().Contains("confirmed")
                        && a.AppointmentDate!.Value.CompareTo(DateTime.Now) < 0);

            }
            else if (status == "confirmed")
            {
                appointments = _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted
                        && a.AppointmentStatus.ToLower().Contains("confirmed")
                        && a.AppointmentDate!.Value.CompareTo(DateTime.Now) >= 0);
            }
            else
            {
                appointments = _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.AppointmentStatus.ToLower().Contains(status));
            }

            switch (userType)
            {
                case "patient":
                    appointments = appointments.Where(a => a.PatientId == id);
                    break;
                case "doctor":
                    appointments = appointments.Where(a => a.DoctorId == id);
                    break;

                default:
                    break;
            }

            var records = appointments.Select(a => new AppointmentTableDto
            {
                AppointmentDate = a.AppointmentDate,
                ClosedBy = a.ClosedBy,
                ClosedDate = a.ClosedDate,
                CreatedBy = a.CreatedBy,
                CreatedDate = a.CreatedDate,
                DateOfConsultation = a.DateOfConsultation,
                DoctorName = a.Doctor.FullName,
                Id = a.Id,
                PatientName = a.Patient.FullName,
                Status = a.AppointmentStatus
            });

            var recordsTotal = records.Count();
            var searchValue = parameters.Search.Value.IsNullOrEmpty() ? "" : parameters.Search.Value!.ToLower().Trim();

            records = records.Where(d =>
                    d.Id.ToString().Trim().Contains(searchValue)
                    || d.DoctorName!.Trim().ToLower().Contains(searchValue)
                    || d.DateOfConsultation.ToString().ToLower().Contains(searchValue)
                    || d.Status!.Trim().ToLower().Contains(searchValue)
                    || d.PatientName!.Trim().ToLower().Contains(searchValue)
                    || d.CreatedBy!.Trim().ToLower().Contains(searchValue)
                    || d.CreatedDate.ToString().Trim().ToLower().Contains(searchValue)
                    || d.AppointmentDate!.Value.ToString().Trim().ToLower().Contains(searchValue)
                    || d.ClosedBy!.Trim().ToLower().Contains(searchValue)
                    || d.ClosedDate!.Value.ToString().Trim().ToLower().Contains(searchValue));


            if (parameters.Order.Count() != 0)
                switch (parameters.Order[0].Column)
                {
                    case (2):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.DoctorName) : records.OrderByDescending(r => r.DoctorName);
                        break;
                    case (3):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.AppointmentDate) : records.OrderByDescending(r => r.AppointmentDate);
                        break;
                    case (4):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.DateOfConsultation) : records.OrderByDescending(r => r.DateOfConsultation);
                        break;
                    case (5):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.Status) : records.OrderByDescending(r => r.Status);
                        break;
                    case (6):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.ClosedBy) : records.OrderByDescending(r => r.ClosedBy);
                        break;
                    case (7):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.ClosedDate) : records.OrderByDescending(r => r.ClosedDate);
                        break;
                    case (8):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.CreatedBy) : records.OrderByDescending(r => r.CreatedDate);
                        break;
                    default:
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.Id) : records.OrderByDescending(r => r.Id);
                        break;
                }


            records = records
                .Skip(parameters.Start)
                .Take(parameters.Length);

            var data = records.ToList();
            foreach (var item in data)
            {
                if (!item.CreatedBy.IsNullOrEmpty())
                {
                    item.CreatedBy = GetFullName(item.CreatedBy); 
                    item.ClosedBy = GetFullName(item.ClosedBy);
                }
            }

            response.RecordsTotal = recordsTotal;
            response.RecordsFiltered = recordsTotal;
            response.Data = data;
            return Task.FromResult(response);

        }

        private string GetFullName(string? id)
        {
            if (id == null)
                return "--unknown--";

            var patient = _unitOfWork.Repository<Patient>().GetAll.Where(d => d.UserId == id).FirstOrDefault();
            if (patient != null)
            {
                return patient.FullName ?? "patient";
            }

            var doctor = _unitOfWork.Repository<Doctor>().GetAll.Where(d => d.UserId == id).FirstOrDefault();
            if (doctor != null)
            {
                return doctor.FullName;
            }

            return "admin";
        }

        private string GetFullName(string id, string userType)
        {
            switch (userType.ToLower().Trim())
            {
                case "patient":
                    return (_unitOfWork.Repository<Patient>().GetAll.Where(d => d.UserId == id).FirstOrDefault())!.FullName!;
                case "doctor":
                    return (_unitOfWork.Repository<Doctor>().GetAll.Where(d => d.UserId == id).FirstOrDefault())!.FullName;
                default:
                    return "admin";
            }
        }

        private int GetActorId(string userId, string userType)
        {
            switch (userType.ToLower().Trim())
            {
                case "patient":
                    var patient = _unitOfWork.Repository<Patient>().GetAll.FirstOrDefault(x => x.UserId == userId);
                    return patient != null ? patient.Id : 0;
                case "doctor":
                    var doctor = _unitOfWork.Repository<Doctor>().GetAll.FirstOrDefault(x => x.UserId == userId);
                    return doctor != null ? doctor.Id : 0;
                default:
                    break;
            }
            return 0;
        }

        private string GetStatus(string type)
        {
            string status = type;
            switch (type.ToLower())
            {
                case "pending":
                    status = "pending";
                    break;
                case "confirmed":
                    status = "confirmed";
                    break;
                case "completed":
                    status = "completed";
                    break;
                case "cancelled":
                    status = "cancelled";
                    break;
                case "out-of-date":
                    status = "out-of-date";
                    break;
                case "all":
                    status = "";
                    break;
                default:
                    break;
            }

            return status;
        }

        public async Task<ApiResponse> CancelAppointment(int id)
        {
            _unitOfWork.BeginTransaction();
            try
            {
                var appointment = await _unitOfWork.Repository<Appointment>().GetByIdAsync(id);
                appointment.AppointmentStatus = AppointmentStatus.Cancelled.ToString();
                _unitOfWork.Commit();
                return new ApiResponse
                {
                    IsSuccess = true,
                    Message = $"You just cancelled appointment with id {id}",
                    Id = id.ToString()
                };
            }
            catch
            {
                _unitOfWork.Rollback();
                return new ApiResponse
                {
                    IsSuccess = false,
                    Message = $"Cancel appointment with id = {id} failed",
                    Id = id.ToString()
                };
            }
        }

        public async Task<ViewAppointmentDto> ViewAppointmentDetails(int id)
        {
            var appointment = await _unitOfWork.Repository<Appointment>().GetByIdAsync(id);
            if (appointment == null) throw new NotFoundException("appointment", id);
            var viewApptDto = _mapper.Map<ViewAppointmentDto>(appointment);
            return viewApptDto;
        }

        public async Task<List<int>> LoadWidgets(string id, string userType)
        {
            List<int> result = new List<int>
            {
                await GetTotalAppointment(id, userType),
                await GetTodayAppointment(id, userType),
                await GetConfirmedAppointment(id, userType),
                await GetPendingAppointment(id, userType)
            };
            return result;
        }

        private async Task<int> GetTotalAppointment(string id, string userType)
        {
            switch (userType)
            {
                case "patient":
                    var totalAppt = await _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.Patient.UserId == id)
                        .CountAsync();
                    return totalAppt;
                case "doctor":
                    totalAppt = await _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.Doctor.UserId == id)
                        .CountAsync();
                    return totalAppt;
                default:
                    totalAppt = await _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted)
                        .CountAsync();
                    return totalAppt;
            }
        }

        private async Task<int> GetTodayAppointment(string id, string userType)
        {
            switch (userType)
            {
                case "patient":
                    var totalAppt = await _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.Patient.UserId == id && a.AppointmentDate.Value.Date.Equals(DateTime.Now.Date))
                        .CountAsync();
                    return totalAppt;
                case "doctor":
                    totalAppt = await _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.Doctor.UserId == id && a.AppointmentDate.Value.Date.Equals(DateTime.Now.Date))
                        .CountAsync();
                    return totalAppt;
                default:
                    totalAppt = await _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.AppointmentDate.Value.Date.Equals(DateTime.Now.Date))
                        .CountAsync();
                    return totalAppt;
            }
        }

        private async Task<int> GetConfirmedAppointment(string id, string userType)
        {
            switch (userType)
            {
                case "patient":
                    var totalAppt = await _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.Patient.UserId == id && a.AppointmentStatus.ToLower() == "confirmed")
                        .CountAsync();
                    return totalAppt;
                case "doctor":
                    totalAppt = await _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.Doctor.UserId == id && a.AppointmentStatus.ToLower() == "confirmed")
                        .CountAsync();
                    return totalAppt;
                default:
                    totalAppt = await _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.AppointmentStatus.ToLower() == "confirmed")
                        .CountAsync();
                    return totalAppt;
            }
        }

        private async Task<int> GetPendingAppointment(string id, string userType)
        {
            switch (userType)
            {
                case "patient":
                    var totalAppt = await _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.Patient.UserId == id && a.AppointmentStatus.ToLower() == "pending")
                        .CountAsync();
                    return totalAppt;
                case "doctor":
                    totalAppt = await _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.Doctor.UserId == id && a.AppointmentStatus.ToLower() == "pending")
                        .CountAsync();
                    return totalAppt;
                default:
                    totalAppt = await _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.AppointmentStatus.ToLower() == "pending")
                        .CountAsync();
                    return totalAppt;
            }
        }

        public async Task<List<RecentlyAppointmentDto>> GetRecentlyAppointment(string id)
        {
            var result = await _unitOfWork.Repository<Appointment>().GetAll
                .Where(a => !a.IsDeleted && a.Patient.UserId == id)
                .OrderByDescending(a => a.AppointmentDate)
                .Select(a => new RecentlyAppointmentDto
                {
                    Id = a.Id,
                    AppointmentDate = a.AppointmentDate.Value.ToString("ddd dd/MM/yyyy"),
                    AvatarUrl = a.Doctor.User.AvatarUrl ?? "Uploads/Images/default-user.jpg",
                    DoctorName = a.Doctor.FullName,
                    Speciality = a.Doctor.Speciality
                })
                .Take(5)
                .ToListAsync();
            return result;
        }

        public async Task<List<UpcomingAppointmentDto>> GetUpcomingAppointment(string id, string userType)
        {
            var appointments = userType.ToLower() switch
            {

                "patient" => _unitOfWork.Repository<Appointment>().GetAll
                    .Where(a => !a.IsDeleted
                    && a.Patient.UserId == id
                    && a.AppointmentStatus.ToLower() == "confirmed"),
                "doctor" => _unitOfWork.Repository<Appointment>().GetAll
                    .Where(a => !a.IsDeleted
                    && a.Doctor.UserId == id
                    && a.AppointmentStatus.ToLower() == "confirmed"),
                _ => _unitOfWork.Repository<Appointment>().GetAll
                    .Where(a => !a.IsDeleted
                    && a.AppointmentStatus.ToLower() == "confirmed"),
            };

            var result = await appointments
                .OrderByDescending(a => a.AppointmentDate)
                .Select(a => new UpcomingAppointmentDto
                {
                    Id = a.Id,
                    AppointmentDate = a.AppointmentDate.Value.ToString("hh:ss dd/MM/yyyy"),
                    DateOfConsultation = a.DateOfConsultation.ToString("hh:ss dd/MM/yyyy"),
                    PatientName = a.Patient.FullName,
                    PatientGender = a.Patient.Gender == 0 ? "Male" : a.Patient.Gender == 0 ? "Female" : "Other",
                    DoctorName = a.Doctor.FullName,
                    Speciality = a.Doctor.Speciality,
                    CreatedDate = a.CreatedDate.ToString("dd/MM/yyyy"),
                    Status = a.AppointmentStatus,
                })
                .Take(15)
                .ToListAsync();

            return result;
        }

        public async Task<List<PatientToFillDropdownDto>> GetPatients()
        {
            var patients = await _unitOfWork.Repository<Patient>().GetAll
                .Where(p => !p.IsDeleted)
                .Select(p => new PatientToFillDropdownDto
                {
                    Id = p.Id,
                    FullName = p.FullName
                })
                .ToListAsync();

            return patients;
        }

        public async Task<List<AppointmentEventDto>> GetAppointmentEventsByDoctor(EJ2Params param, string currentUserId)
        {
            var appointmentEvents = await _unitOfWork.Repository<Appointment>().GetAll
                .Where(a => a.Doctor.UserId == currentUserId
                    && !a.IsDeleted
                    && a.AppointmentDate <= param.EndDate
                    && a.AppointmentDate >= param.StartDate)
                .Select(a => new AppointmentEventDto
                {
                    Id = a.Id,
                    Allergies = a.DrugAllergies,
                    DoctorId = a.DoctorId,
                    AppointmentDate = a.AppointmentDate!.Value,
                    AppointmentStatus = a.AppointmentStatus,
                    EndTime = a.AppointmentDate.Value.AddMinutes(a.Schedule.ConsultantTime),
                    StartTime = a.AppointmentDate.Value,
                    ExistingIllness = a.ExistingIllness,
                    Notes = a.Note,
                    Subject = a.Patient.FullName,
                    PatientId = a.PatientId,
                    ScheduleId = a.ScheduleId
                })
                .ToListAsync();

            return appointmentEvents;
        }

        public async Task<ApiResponse> AddNewPatient(AddNewPatientDto model)
        {
            _unitOfWork.BeginTransaction();
            try
            {
                Patient patient = _mapper.Map<Patient>(model);
                await _unitOfWork.Repository<Patient>().AddAsync(patient);
                _unitOfWork.Commit();
                return new ApiResponse
                {
                    IsSuccess = true,
                    Message = "Add new patient successfully"
                };
            }
            catch
            {
                _unitOfWork.Rollback();
                return new ApiResponse
                {
                    IsSuccess = false,
                    Message = "Add new patient failed"
                };
            }
        }

        public async Task<ApiResponse> AppointmentOnSite(EJ2UpdateParams<AppointmentEventDto> param, string currrentUserId)
        {
            if (param.added.Count > 0)
            {
                return await AddNewAppointmentEvent(param, currrentUserId);
            }
            else if (param.changed.Count > 0)
            {
                return await UpdateAppointmentEvent(param, currrentUserId);
            }
            else
            {
                return await DeleteAppointmentEvent(param.deleted![0].Id);
            }
        }

        private async Task<ApiResponse> DeleteAppointmentEvent(int id)
        {
            _unitOfWork.BeginTransaction();

            var appointmentId = _unitOfWork.Repository<Appointment>().DeleteByIdAsync(id).Result;
            _unitOfWork.Commit();
            if (appointmentId != 0)
            {
                return new ApiResponse
                {
                    IsSuccess = true,
                    Message = "Delete appointment successfully"
                };
            }
            throw new Exception("Delete appointment failed");
        }

        private async Task<ApiResponse> UpdateAppointmentEvent(EJ2UpdateParams<AppointmentEventDto> param, string currrentUserId)
        {
            _unitOfWork.BeginTransaction();
            var appointmentEventDto = param.changed![0];
            var appointmentDate = appointmentEventDto!.AppointmentDate.ToLocalTime();
            var appointmentId = appointmentEventDto.Id;


            if (appointmentEventDto.Patient == null)
            {
                throw new Exception("Please choose patient to make appointment");
            }

            var existSchedule = _unitOfWork.Repository<Schedule>().GetAll
                .Where(s =>
                s.Doctor.UserId == currrentUserId
                && s.WorkingDay.Date == appointmentDate.Date
                && s.BreakTime >= appointmentDate.TimeOfDay
                && s.ShiftTime <= appointmentDate.TimeOfDay)
                .FirstOrDefault();

            if (existSchedule == null)
            {
                /*return new ApiResponse
                {
                    IsSuccess = false,
                    Message = $"There are no scheduled dates for {appointmentDate.ToString("dd MMM yyyy")}"
                };*/

                throw new Exception($"There are no scheduled dates for {appointmentDate.ToString("dd MMM yyyy")}");
            }

            var appointment = _unitOfWork.Repository<Appointment>().GetByIdAsync(appointmentId).Result;

            if (appointment == null) throw new NotFoundException("appointment", appointmentId);

            appointment.ExistingIllness = appointmentEventDto.ExistingIllness;
            appointment.Note = appointmentEventDto.Notes;
            appointment.DrugAllergies = appointmentEventDto.Allergies;
            appointment.AppointmentDate = appointmentDate;

            await _unitOfWork.Repository<Appointment>().UpdateAsync(appointment);
            _unitOfWork.Commit();
            return new ApiResponse
            {
                IsSuccess = true,
                Message = "Update appointment successfully"
            };
        }

        private async Task<ApiResponse> AddNewAppointmentEvent(EJ2UpdateParams<AppointmentEventDto> param, string currrentUserId)
        {
            _unitOfWork.BeginTransaction();
            var appointmentEventDto = param.added![0];
            if (appointmentEventDto.Patient == null)
            {
                throw new Exception("Please choose patient to make appointment");
            }

            var appointmentDate = appointmentEventDto.AppointmentDate.ToLocalTime();

            var existSchedule = _unitOfWork.Repository<Schedule>().GetAll
                .Where(s =>
                s.Doctor.UserId == currrentUserId
                && s.WorkingDay.Date.Equals(appointmentDate.Date)
                && s.BreakTime >= appointmentDate.TimeOfDay
                && s.ShiftTime <= appointmentDate.TimeOfDay)
                .FirstOrDefault();

            if (existSchedule == null)
            {
                /* return new ApiResponse
                 {
                     IsSuccess = false,
                     Message = $"There are no scheduled dates for {appointmentDate.ToString("dd MMM yyyy")}"
                 };*/

                throw new Exception($"There are no scheduled dates for {appointmentDate.ToString("dd MMM yyyy")}");
            }

            var appointment = new Appointment();
            appointment.AppointmentDate = appointmentDate;
            appointment.DateOfConsultation = appointmentDate;
            appointment.DoctorId = existSchedule.DoctorId;
            appointment.PatientId = appointmentEventDto!.Patient!.Id;
            appointment.Note = appointmentEventDto.Notes;
            appointment.ExistingIllness = appointmentEventDto.ExistingIllness;
            appointment.ScheduleId = existSchedule.Id;
            appointment.DrugAllergies = appointmentEventDto.Allergies;
            appointment.AppointmentStatus = AppointmentStatus.Confirmed.ToString();

            await _unitOfWork.Repository<Appointment>().AddAsync(appointment);
            _unitOfWork.Commit();
            return new ApiResponse
            {
                IsSuccess = true,
                Message = "Make appointment successfully"
            };
        }

        public async Task<List<NewBookingDto>> GetNewBooking(string id)
        {
            var result = await _unitOfWork.Repository<Appointment>().GetAll
                .Where(a => !a.IsDeleted
                && a.Doctor.UserId == id
                && a.AppointmentStatus.ToLower() == "pending")
                .Select(a => new NewBookingDto
                {
                    Id = a.Id,
                    AppointmentDate = a.AppointmentDate.Value,
                    DateOfBirth = a.Patient.DateOfBirth,
                    Gender = a.Patient.Gender == 0 ? "Male" : a.Patient.Gender == 1 ? "Female" : "Other",
                    PatientName = a.Patient.FullName,
                    AvatarUrl = a.Patient.User.AvatarUrl
                })
                .OrderByDescending(a => a.AppointmentDate)
                .Take(15)
                .ToListAsync();
            return result;
        }

        public async Task<ApiResponse> UpdateAppointmentStatus(int id, string appointmentStatus)
        {
            _unitOfWork.BeginTransaction();

            var appointment = await _unitOfWork.Repository<Appointment>().GetByIdAsync(id);
            if (appointment == null)
                return new ApiResponse
                {
                    IsSuccess = false,
                    Message = $"Not found appointment with id {id}"
                };
            appointment.AppointmentStatus = appointmentStatus;
            if(appointmentStatus.ToLower() == "completed")
            {
                var closedBy = _currentUserService.GetCurrentUserId();
                var closedDate = DateTime.Now;
                appointment.ClosedBy = closedBy;
                appointment.ClosedDate = closedDate;
            }
            await _unitOfWork.Repository<Appointment>().UpdateAsync(appointment);
            _unitOfWork.Commit();

            return new ApiResponse
            {
                IsSuccess = true,
                Message = $"Updated the appointment's status to {appointmentStatus}"
            };
        }

        public async Task<ApiResponse> ChangeAppointmentDate(int id, DateTime appointmentDate)
        {
            _unitOfWork.BeginTransaction();

            var appointment = await _unitOfWork.Repository<Appointment>().GetByIdAsync(id);
            if (appointment == null)
                return new ApiResponse
                {
                    IsSuccess = false,
                    Message = $"Not found appointment with id {id}"
                };
            appointment.AppointmentDate = appointmentDate.ToLocalTime();
            await _unitOfWork.Repository<Appointment>().UpdateAsync(appointment);
            _unitOfWork.Commit();

            return new ApiResponse
            {
                IsSuccess = true,
                Message = $"Updated the appointment date to {appointmentDate.ToLocalTime().ToString("ddd dd/MM/yyyy hh:mm")}"
            };
        }

        public async Task<ApiResponse> UpdateDiagnosis(int id, DiagnosisDto diagnosis)
        {
            _unitOfWork.BeginTransaction();

            var appointment = await _unitOfWork.Repository<Appointment>().GetByIdAsync(id);
            if (appointment == null)
                return new ApiResponse
                {
                    IsSuccess = false,
                    Message = $"Not found appointment with id {id}"
                };
            appointment.Diagnosis = diagnosis.Diagnosis;
            appointment.AdviceToPatient = diagnosis.AdviceToPatient;
            appointment.CaseNote = diagnosis.CaseNote;

            await _unitOfWork.Repository<Appointment>().UpdateAsync(appointment);
            _unitOfWork.Commit();

            return new ApiResponse
            {
                IsSuccess = true,
                Message = $"Updated the diagnosis successfully"
            };
        }

        public async Task<List<PrescriptionDto>> GetPrescriptions(int id)
        {
            _unitOfWork.BeginTransaction();

            var prescriptions = await _unitOfWork.Repository<Prescription>().GetAll
                .Where(
                    p => !p.IsDeleted
                    && p.AppointmentId == id)
                .Select(p => new PrescriptionDto
                {
                    Drug = p.Drug,
                    Frequency = p.Frequency,
                    Id = p.Id,
                    MedicationDays = p.MedicationDays,
                    Note = p.Note,
                    Quantity = p.Quantity,
                    Unit = p.Unit,
                    AppointmentId = p.AppointmentId,
                    IsDeleted = p.IsDeleted
                })
                .ToListAsync();

            return prescriptions;
        }

        public async Task<ApiResponse> UpdatePrescriptions(int id, List<PrescriptionDto> prescriptions)
        {
            _unitOfWork.BeginTransaction();
            foreach(var presDto in prescriptions)
            {
                if (presDto.Id != 0 && presDto.Id != null)
                {
                    var prescription = await _unitOfWork.Repository<Prescription>().GetByIdAsync(presDto.Id.Value);
                    prescription.Quantity = presDto.Quantity;
                    prescription.Drug = presDto.Drug;
                    prescription.Frequency = presDto.Frequency;
                    prescription.IsDeleted = presDto.IsDeleted;
                    prescription.Unit = presDto.Unit;
                    prescription.MedicationDays = presDto.MedicationDays;

                    await _unitOfWork.Repository<Prescription>().UpdateAsync(prescription);
                }
                else
                {
                    var newPrescription = _mapper.Map<Prescription>(presDto);
                    await _unitOfWork.Repository<Prescription>().AddAsync(newPrescription);
                }
            }
            _unitOfWork.Commit();

            return new ApiResponse
            {
                IsSuccess = true,
                Message = "Update prescriptions successfully"
            };
        }

        public async Task<DiagnosisDto> GetDiagnosis(int id)
        {
            var appointment = await _unitOfWork.Repository<Appointment>().GetByIdAsync(id);
            if (appointment == null)
                throw new NotFoundException("appointment", id.ToString());

            return new DiagnosisDto
            {
                AdviceToPatient = appointment.AdviceToPatient,
                CaseNote = appointment.CaseNote,
                Diagnosis = appointment.Diagnosis
            };
        }

        public async Task<List<FrequencyDto>> GetFreq()
        {
            var freqs = await _unitOfWork.Repository<SystemPara>().GetAll
                .Where(s => s.Groupid.ToLower().Contains("frequency"))
                .Select(s => new FrequencyDto
                {
                    Value = s.Id,
                    Text = s.Paraval
                })
                .ToListAsync();
            return freqs;
        }

        public async Task<List<UnitDto>> GetUnit()
        {
            var unit = await _unitOfWork.Repository<SystemPara>().GetAll
                .Where(s => s.Groupid.ToLower().Contains("unit"))
                .Select(s => new UnitDto
                {
                    Value = s.Id,
                    Text = s.Paraval
                })
                .ToListAsync();
            return unit;
        }
    }
}
