using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebAPI.Domain.Entities;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Interfaces.IService;

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
                    Status = a.AppoimentStatus,
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
                Status = a.AppoimentStatus,
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
                .Where(a => a.IsDeleted != true && a.AppoimentStatus.ToLower().Trim() == "cancel")
                .Include(a => a.Patient)
                .Include(a => a.Schedule.Doctor)
                .Select(a => new GetAppointmentToDrawTableDto
                {
                    Id = a.Id,
                    DoctorName = a.Schedule.Doctor.FullName,
                    PatientName = a.Patient.FullName,
                    AppointmentDate = a.AppointmentDate.Value,
                    DateOfConsultation = a.DateOfConsultation,
                    Status = a.AppoimentStatus,
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
                                .Where(a => a.IsDeleted != true && a.AppoimentStatus.Trim().ToLower() == "cancel" && a.PatientId == id)
                                .Include(a => a.Patient)
                                .Include(a => a.Schedule.Doctor);
                    break;
                case "doctor":
                    data = _unitOfWork.Repository<Appointment>().GetAll
                                .Where(a => a.IsDeleted != true && a.AppoimentStatus.Trim().ToLower() == "cancel" && a.DoctorId == id)
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
                Status = a.AppoimentStatus,
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
                .Where(a => a.IsDeleted != true && a.AppoimentStatus.ToLower().Trim() == "completed")
                .Include(a => a.Patient)
                .Include(a => a.Schedule.Doctor)
                .Select(a => new GetAppointmentToDrawTableDto
                {
                    Id = a.Id,
                    DoctorName = a.Schedule.Doctor.FullName,
                    PatientName = a.Patient.FullName,
                    AppointmentDate = a.AppointmentDate.Value,
                    DateOfConsultation = a.DateOfConsultation,
                    Status = a.AppoimentStatus,
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
                                .Where(a => a.IsDeleted != true && a.AppoimentStatus.Trim().ToLower() == "completed" && a.PatientId == id)
                                .Include(a => a.Patient)
                                .Include(a => a.Schedule.Doctor);
                    break;
                case "doctor":
                    data = _unitOfWork.Repository<Appointment>().GetAll
                                .Where(a => a.IsDeleted != true && a.AppoimentStatus.Trim().ToLower() == "completed" && a.DoctorId == id)
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
                Status = a.AppoimentStatus,
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
                .Where(a => a.IsDeleted != true && a.AppoimentStatus.ToLower().Trim() == "confirm" && a.AppointmentDate.Value.CompareTo(DateTime.Now) <= 0)
                .Include(a => a.Patient)
                .Include(a => a.Schedule.Doctor)
                .Select(a => new GetAppointmentToDrawTableDto
                {
                    Id = a.Id,
                    DoctorName = a.Schedule.Doctor.FullName,
                    PatientName = a.Patient.FullName,
                    AppointmentDate = a.AppointmentDate.Value,
                    DateOfConsultation = a.DateOfConsultation,
                    Status = a.AppoimentStatus,
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
                                .Where(a => a.IsDeleted != true && a.AppoimentStatus.Trim().ToLower() == "confirm" && a.AppointmentDate.Value.CompareTo(DateTime.Now) <= 0 && a.PatientId == id)
                                .Include(a => a.Patient)
                                .Include(a => a.Schedule.Doctor);
                    break;
                case "doctor":
                    data = _unitOfWork.Repository<Appointment>().GetAll
                                .Where(a => a.IsDeleted != true && a.AppoimentStatus.Trim().ToLower() == "comfirm" && a.AppointmentDate.Value.CompareTo(DateTime.Now) <= 0 && a.DoctorId == id)
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
                Status = a.AppoimentStatus,
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
                .Where(a => a.IsDeleted != true && a.AppoimentStatus.ToLower().Trim() == "confirm" && a.AppointmentDate.Value.CompareTo(DateTime.Now) > 0)
                .Include(a => a.Patient)
                .Include(a => a.Schedule.Doctor)
                .Select(a => new GetAppointmentToDrawTableDto
                {
                    Id = a.Id,
                    DoctorName = a.Schedule.Doctor.FullName,
                    PatientName = a.Patient.FullName,
                    AppointmentDate = a.AppointmentDate.Value,
                    DateOfConsultation = a.DateOfConsultation,
                    Status = a.AppoimentStatus,
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
                                .Where(a => a.IsDeleted != true && a.AppoimentStatus.Trim().ToLower() == "confirm" && a.PatientId == id)
                                .Include(a => a.Patient)
                                .Include(a => a.Schedule.Doctor);
                    break;
                case "doctor":
                    data = _unitOfWork.Repository<Appointment>().GetAll
                                .Where(a => a.IsDeleted != true && a.AppoimentStatus.Trim().ToLower() == "confirm" && a.DoctorId == id)
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
                Status = a.AppoimentStatus,
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
    }
}
