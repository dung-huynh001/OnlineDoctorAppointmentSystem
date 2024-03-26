using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Domain.Entities;
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

        public AppointmentService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }
        public async Task<List<GetAppointmentToDrawTableDto>> GetAll()
        {
            var result = await _unitOfWork.Repository<Appointment>().GetAll
                .Where(a => a.IsDeleted != true)
                .Include(a => a.Patient)
                .Include(a => a.Schedule.Doctor)
                .Select(a => new GetAppointmentToDrawTableDto
                {
                    Id = a.Id,
                    DoctorName = a.Schedule.Doctor.FullName,
                    PatientName = a.Patient.FullName,
                    AppointmentDate = a.AppointmentDate.Value,
                    DateOfConsultation = a.DateOfConsultation,
                    Status = a.AppointmentStatus,
                    ClosedBy = a.ClosedBy,
                    ClosedDate = a.ClosedDate.Value,
                    CreatedBy = a.CreatedBy,
                    CreatedDate = a.CreatedDate,
                })
                .ToListAsync();
            return result;
        }

        public async Task<List<GetAppointmentToDrawTableDto>> GetAll(int id, string userType)
        {
            IQueryable<Appointment> data;
            switch (userType.Trim().ToLower())
            {
                case "patient":
                    data = _unitOfWork.Repository<Appointment>().GetAll
                                .Where(a => a.IsDeleted != true && a.PatientId == id)
                                .Include(a => a.Patient)
                                .Include(a => a.Schedule.Doctor);
                    break;
                case "doctor":
                    data = _unitOfWork.Repository<Appointment>().GetAll
                                .Where(a => a.IsDeleted != true && a.DoctorId == id)
                                .Include(a => a.Patient)
                                .Include(a => a.Schedule.Doctor);
                    break;
                default:
                    data = null;
                    break;

            }

            var result = data?.Select(a => new GetAppointmentToDrawTableDto
            {
                Id = a.Id,
                DoctorName = a.Schedule.Doctor.FullName,
                PatientName = a.Patient.FullName,
                AppointmentDate = a.AppointmentDate.Value,
                DateOfConsultation = a.DateOfConsultation,
                Status = a.AppointmentStatus,
                ClosedBy = a.ClosedBy,
                ClosedDate = a.ClosedDate.Value,
                CreatedBy = a.CreatedBy,
                CreatedDate = a.CreatedDate,
            }).ToListAsync();

            return await result;
        }

        public async Task<List<GetAppointmentToDrawTableDto>> GetCancelled()
        {
            var result = await _unitOfWork.Repository<Appointment>().GetAll
                .Where(a => a.IsDeleted != true && a.AppointmentStatus.ToLower().Trim() == "cancel")
                .Include(a => a.Patient)
                .Include(a => a.Schedule.Doctor)
                .Select(a => new GetAppointmentToDrawTableDto
                {
                    Id = a.Id,
                    DoctorName = a.Schedule.Doctor.FullName,
                    PatientName = a.Patient.FullName,
                    AppointmentDate = a.AppointmentDate.Value,
                    DateOfConsultation = a.DateOfConsultation,
                    Status = a.AppointmentStatus,
                    ClosedBy = a.ClosedBy,
                    ClosedDate = a.ClosedDate.Value,
                    CreatedBy = a.CreatedBy,
                    CreatedDate = a.CreatedDate,
                })
                .ToListAsync();
            return result;
        }

        public async Task<List<GetAppointmentToDrawTableDto>> GetCancelled(int id, string userType)
        {
            IQueryable<Appointment> data;
            switch (userType.Trim().ToLower())
            {
                case "patient":
                    data = _unitOfWork.Repository<Appointment>().GetAll
                                .Where(a => a.IsDeleted != true && a.AppointmentStatus.Trim().ToLower() == "cancel" && a.PatientId == id)
                                .Include(a => a.Patient)
                                .Include(a => a.Schedule.Doctor);
                    break;
                case "doctor":
                    data = _unitOfWork.Repository<Appointment>().GetAll
                                .Where(a => a.IsDeleted != true && a.AppointmentStatus.Trim().ToLower() == "cancel" && a.DoctorId == id)
                                .Include(a => a.Patient)
                                .Include(a => a.Schedule.Doctor);
                    break;
                default:
                    data = null;
                    break;

            }

            var result = data?.Select(a => new GetAppointmentToDrawTableDto
            {
                Id = a.Id,
                DoctorName = a.Schedule.Doctor.FullName,
                PatientName = a.Patient.FullName,
                AppointmentDate = a.AppointmentDate.Value,
                DateOfConsultation = a.DateOfConsultation,
                Status = a.AppointmentStatus,
                ClosedBy = a.ClosedBy,
                ClosedDate = a.ClosedDate.Value,
                CreatedBy = a.CreatedBy,
                CreatedDate = a.CreatedDate,
            }).ToListAsync();

            return await result;
        }

        public async Task<List<GetAppointmentToDrawTableDto>> GetCompleted()
        {
            var result = await _unitOfWork.Repository<Appointment>().GetAll
                .Where(a => a.IsDeleted != true && a.AppointmentStatus.ToLower().Trim() == "completed")
                .Include(a => a.Patient)
                .Include(a => a.Schedule.Doctor)
                .Select(a => new GetAppointmentToDrawTableDto
                {
                    Id = a.Id,
                    DoctorName = a.Schedule.Doctor.FullName,
                    PatientName = a.Patient.FullName,
                    AppointmentDate = a.AppointmentDate.Value,
                    DateOfConsultation = a.DateOfConsultation,
                    Status = a.AppointmentStatus,
                    ClosedBy = a.ClosedBy,
                    ClosedDate = a.ClosedDate.Value,
                    CreatedBy = a.CreatedBy,
                    CreatedDate = a.CreatedDate,
                })
                .ToListAsync();
            return result;
        }

        public async Task<List<GetAppointmentToDrawTableDto>> GetCompleted(int id, string userType)
        {
            IQueryable<Appointment> data;
            switch (userType.Trim().ToLower())
            {
                case "patient":
                    data = _unitOfWork.Repository<Appointment>().GetAll
                                .Where(a => a.IsDeleted != true && a.AppointmentStatus.Trim().ToLower() == "completed" && a.PatientId == id)
                                .Include(a => a.Patient)
                                .Include(a => a.Schedule.Doctor);
                    break;
                case "doctor":
                    data = _unitOfWork.Repository<Appointment>().GetAll
                                .Where(a => a.IsDeleted != true && a.AppointmentStatus.Trim().ToLower() == "completed" && a.DoctorId == id)
                                .Include(a => a.Patient)
                                .Include(a => a.Schedule.Doctor);
                    break;
                default:
                    data = null;
                    break;

            }

            var result = data?.Select(a => new GetAppointmentToDrawTableDto
            {
                Id = a.Id,
                DoctorName = a.Schedule.Doctor.FullName,
                PatientName = a.Patient.FullName,
                AppointmentDate = a.AppointmentDate.Value,
                DateOfConsultation = a.DateOfConsultation,
                Status = a.AppointmentStatus,
                ClosedBy = a.ClosedBy,
                ClosedDate = a.ClosedDate.Value,
                CreatedBy = a.CreatedBy,
                CreatedDate = a.CreatedDate,
            }).ToListAsync();

            return await result;
        }

        public async Task<List<GetAppointmentToDrawTableDto>> GetOutOfDate()
        {
            var result = await _unitOfWork.Repository<Appointment>().GetAll
                .Where(a => a.IsDeleted != true && a.AppointmentStatus.ToLower().Trim() == "confirm" && a.AppointmentDate.Value.CompareTo(DateTime.Now) <= 0)
                .Include(a => a.Patient)
                .Include(a => a.Schedule.Doctor)
                .Select(a => new GetAppointmentToDrawTableDto
                {
                    Id = a.Id,
                    DoctorName = a.Schedule.Doctor.FullName,
                    PatientName = a.Patient.FullName,
                    AppointmentDate = a.AppointmentDate.Value,
                    DateOfConsultation = a.DateOfConsultation,
                    Status = a.AppointmentStatus,
                    ClosedBy = a.ClosedBy,
                    ClosedDate = a.ClosedDate.Value,
                    CreatedBy = a.CreatedBy,
                    CreatedDate = a.CreatedDate,
                })
                .ToListAsync();
            return result;
        }

        public async Task<List<GetAppointmentToDrawTableDto>> GetOutOfDate(int id, string userType)
        {
            IQueryable<Appointment> data;
            switch (userType.Trim().ToLower())
            {
                case "patient":
                    data = _unitOfWork.Repository<Appointment>().GetAll
                                .Where(a => a.IsDeleted != true && a.AppointmentStatus.Trim().ToLower() == "confirm" && a.AppointmentDate.Value.CompareTo(DateTime.Now) <= 0 && a.PatientId == id)
                                .Include(a => a.Patient)
                                .Include(a => a.Schedule.Doctor);
                    break;
                case "doctor":
                    data = _unitOfWork.Repository<Appointment>().GetAll
                                .Where(a => a.IsDeleted != true && a.AppointmentStatus.Trim().ToLower() == "comfirm" && a.AppointmentDate.Value.CompareTo(DateTime.Now) <= 0 && a.DoctorId == id)
                                .Include(a => a.Patient)
                                .Include(a => a.Schedule.Doctor);
                    break;
                default:
                    data = null;
                    break;

            }

            var result = data?.Select(a => new GetAppointmentToDrawTableDto
            {
                Id = a.Id,
                DoctorName = a.Schedule.Doctor.FullName,
                PatientName = a.Patient.FullName,
                AppointmentDate = a.AppointmentDate.Value,
                DateOfConsultation = a.DateOfConsultation,
                Status = a.AppointmentStatus,
                ClosedBy = a.ClosedBy,
                ClosedDate = a.ClosedDate.Value,
                CreatedBy = a.CreatedBy,
                CreatedDate = a.CreatedDate,
            }).ToListAsync();

            return await result;
        }

        public async Task<List<GetAppointmentToDrawTableDto>> GetWaiting()
        {
            var result = await _unitOfWork.Repository<Appointment>().GetAll
                .Where(a => a.IsDeleted != true && a.AppointmentStatus.ToLower().Trim() == "confirm" && a.AppointmentDate.Value.CompareTo(DateTime.Now) > 0)
                .Include(a => a.Patient)
                .Include(a => a.Schedule.Doctor)
                .Select(a => new GetAppointmentToDrawTableDto
                {
                    Id = a.Id,
                    DoctorName = a.Schedule.Doctor.FullName,
                    PatientName = a.Patient.FullName,
                    AppointmentDate = a.AppointmentDate.Value,
                    DateOfConsultation = a.DateOfConsultation,
                    Status = a.AppointmentStatus,
                    ClosedBy = a.ClosedBy,
                    ClosedDate = a.ClosedDate.Value,
                    CreatedBy = a.CreatedBy,
                    CreatedDate = a.CreatedDate,
                })
                .ToListAsync();
            return result;
        }

        public async Task<List<GetAppointmentToDrawTableDto>> GetWaiting(int id, string userType)
        {
            IQueryable<Appointment> data;
            switch (userType.Trim().ToLower())
            {
                case "patient":
                    data = _unitOfWork.Repository<Appointment>().GetAll
                                .Where(a => a.IsDeleted != true && a.AppointmentStatus.Trim().ToLower() == "confirm" && a.PatientId == id)
                                .Include(a => a.Patient)
                                .Include(a => a.Schedule.Doctor);
                    break;
                case "doctor":
                    data = _unitOfWork.Repository<Appointment>().GetAll
                                .Where(a => a.IsDeleted != true && a.AppointmentStatus.Trim().ToLower() == "confirm" && a.DoctorId == id)
                                .Include(a => a.Patient)
                                .Include(a => a.Schedule.Doctor);
                    break;
                default:
                    data = null;
                    break;

            }

            var result = data?.Select(a => new GetAppointmentToDrawTableDto
            {
                Id = a.Id,
                DoctorName = a.Schedule.Doctor.FullName,
                PatientName = a.Patient.FullName,
                AppointmentDate = a.AppointmentDate.Value,
                DateOfConsultation = a.DateOfConsultation,
                Status = a.AppointmentStatus,
                ClosedBy = a.ClosedBy,
                ClosedDate = a.ClosedDate.Value,
                CreatedBy = a.CreatedBy,
                CreatedDate = a.CreatedDate,
            }).ToListAsync();

            return await result;
        }

        public async Task<GetAppointmentDetailDto> GetAppointmentDetail(int id)
        {
            var result = await _unitOfWork.Repository<Appointment>().GetAll
                .Where(a => a.Id == id)
                .Include(a => a.Schedule.Doctor)
                .Include(a => a.Patient)
                .Select(a => _mapper.Map<GetAppointmentDetailDto>(a))
                .FirstOrDefaultAsync();
            return result;
        }

        public async Task<PatientDataToAppointment> GetPatientDataToAppointment(string currentUserId)
        {
            var patient = await _unitOfWork.Repository<Patient>().GetAll
                .Where(p => p.UserId.Equals(currentUserId))
                .Select(p => new PatientDataToAppointment
                {
                    PatientId = p.Id,
                    Address = p.Address,
                    DateOfBirth = p.DateOfBirth,
                    Email = p.User.Email,
                    Gender = p.Gender,
                    PatientName = p.FullName,
                    PhoneNumber = p.PhoneNumber
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
                appointment.DateOfConsultation = model.AppointmentDate;

                await _unitOfWork.Repository<Appointment>().AddAsync(appointment);
                _unitOfWork.Commit();
                return new ApiResponse
                {
                    IsSuccess = true,
                    Message = "Make appointment successfully. You will be notified when you hear back from your doctor",
                };
            }
            catch (Exception ex)
            {
                _unitOfWork.Rollback();
                return new ApiResponse
                {
                    IsSuccess = false,
                    Message = "Make appointment failed",
                };
            }
        }

        public Task<DatatableResponse<GetAppointmentToDrawTableDto>> GetAppointments(string userId, string userType, string type, DataTablesParameters parameters)
        {
            var response = new DatatableResponse<GetAppointmentToDrawTableDto>();

            string status = GetStatus(type);
            int id = GetActorId(userId, userType);

            var appointments = _unitOfWork.Repository<Appointment>().GetAll
                        .Where(a => !a.IsDeleted && a.AppointmentStatus.ToLower().Contains(status));
                        

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
                    

            /*if (parameters.Order.Count() != 0)
                switch (parameters.Order[0].Column)
                {
                    case (2):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.FullName) : records.OrderByDescending(r => r.FullName);
                        break;
                    case (3):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.Speciality) : records.OrderByDescending(r => r.Speciality);
                        break;
                    case (4):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.Department) : records.OrderByDescending(r => r.Department);
                        break;
                    case (5):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.Gender) : records.OrderByDescending(r => r.Gender);
                        break;
                    case (6):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.DateOfBirth) : records.OrderByDescending(r => r.DateOfBirth);
                        break;
                    case (7):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.NationalId) : records.OrderByDescending(r => r.NationalId);
                        break;
                    case (8):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.PhoneNumber) : records.OrderByDescending(r => r.PhoneNumber);
                        break;
                    case (9):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.Email) : records.OrderByDescending(r => r.Email);
                        break;
                    case (10):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.IsDeleted) : records.OrderByDescending(r => r.IsDeleted);
                        break;
                    case (11):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.WorkingStartDate) : records.OrderByDescending(r => r.WorkingStartDate);
                        break;
                    case (12):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.WorkingEndDate) : records.OrderByDescending(r => r.WorkingEndDate);
                        break;
                    case (13):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.CreatedBy) : records.OrderByDescending(r => r.CreatedBy);
                        break;
                    case (14):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.CreatedDate) : records.OrderByDescending(r => r.CreatedDate);
                        break;
                    case (15):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.UpdatedBy) : records.OrderByDescending(r => r.UpdatedBy);
                        break;
                    case (16):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.UpdatedDate) : records.OrderByDescending(r => r.UpdatedDate);
                        break;
                    default:
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.Id) : records.OrderByDescending(r => r.Id);
                        break;
                }*/


            records = records
                .Skip(parameters.Start)
                .Take(parameters.Length);

            response.RecordsTotal = recordsTotal;
            response.RecordsFiltered = recordsTotal;
            response.Data = records.ToList();
            return Task.FromResult(response);

        }

        private int GetActorId(string userId, string userType)
        {
            switch(userType.ToLower().Trim())
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
                default:
                    break;
            }

            return status;
        }
    }
}
