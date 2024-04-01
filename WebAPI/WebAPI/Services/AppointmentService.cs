using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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
        public async Task<GetAppointmentDetailDto> GetAppointmentDetail(int id)
        {
            var result = await _unitOfWork.Repository<Appointment>().GetAll
                .Where(a => a.Id == id)
                .Include(a => a.Schedule.Doctor)
                .Include(a => a.Patient)
                .Select(a => _mapper.Map<GetAppointmentDetailDto>(a))
                .FirstOrDefaultAsync();
            if (result == null) throw new Exception();
            return result;
        }

        public async Task<PatientDataToAppointment> GetPatientDataToAppointment(string currentUserId)
        {
            var patient = await _unitOfWork.Repository<Patient>().GetAll
                .Where(p => p.UserId.Equals(currentUserId))
                .Select(p => new PatientDataToAppointment
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

        public Task<DatatableResponse<GetAppointmentToDrawTableDto>> GetAppointments(string userId, string userType, string type, DataTablesParameters parameters)
        {
            var response = new DatatableResponse<GetAppointmentToDrawTableDto>();

            string status = GetStatus(type);
            int id = GetActorId(userId, userType);
            IQueryable<Appointment> appointments;
            if (status == "out-of-date")
            {
                appointments = _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted
                        && a.AppointmentStatus.ToLower().Contains("confirmed")
                        && a.AppointmentDate!.Value.CompareTo(DateTime.Now) > 0);

            }
            else if (status == "confirmed")
            {
                appointments = _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted
                        && a.AppointmentStatus.ToLower().Contains("confirmed")
                        && a.AppointmentDate!.Value.CompareTo(DateTime.Now) <= 0);
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

            var records = appointments.Select(a => new GetAppointmentToDrawTableDto
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
            var searchValue = parameters.Search.Value.IsNullOrEmpty() ? "" : parameters.Search.Value?.ToLower().Trim();

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
                    || d.ClosedDate.Value.ToString().Trim().ToLower().Contains(searchValue));


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
            data.ForEach(async d =>
            {
                if(!d.CreatedBy.IsNullOrEmpty())
                {
                    var nameOfCreator = await _currentUserService.GetFullName(d.CreatedBy!);
                    d.CreatedBy = nameOfCreator;
                }
            });

            response.RecordsTotal = recordsTotal;
            response.RecordsFiltered = recordsTotal;
            response.Data = records.ToList();
            return Task.FromResult(response);

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
            string status = "";
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
                    status = "cancelled";
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
                    AvatarUrl = a.Doctor.User.AvatarUrl ?? "Uploads/Avatars/defaults_user.png",
                    DoctorName = a.Doctor.FullName,
                    Speciality = a.Doctor.Speciality
                })
                .Take(5)
                .ToListAsync();
            return result;
        }

        public async Task<List<UpcomingAppointmentDto>> GetUpcomingAppointment(string id)
        {
            var result = await _unitOfWork.Repository<Appointment>().GetAll
                .Where(a => !a.IsDeleted 
                && a.Patient.UserId == id
                && a.AppointmentStatus.ToLower() == "confirmed")
                .OrderByDescending(a => a.AppointmentDate)
                .Select(a => new UpcomingAppointmentDto
                {
                    Id = a.Id,
                    AppointmentDate = a.AppointmentDate.Value.ToString("hh:ss dd/MM/yyyy"),
                    DateOfConsultation = a.DateOfConsultation.ToString("hh:ss dd/MM/yyyy"),
                    DoctorName = a.Doctor.FullName,
                    Speciality = a.Doctor.Speciality,
                    CreatedDate = a.CreatedDate.ToString("dd/MM/yyyy"),
                    Status = a.AppointmentStatus,
                })
                .Take(15)
                .ToListAsync();
            return result;
        }
    }
}
