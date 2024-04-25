using Microsoft.EntityFrameworkCore;
using System.Globalization;
using WebAPI.Common;
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
    public class PatientService : IPatientService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMailService _mailService;
        private readonly IGenerateOtpService _generateOtpService;
        private readonly Utilies _utilies;
        private readonly ICurrentUserService _currentUserService;

        public PatientService(
            IUnitOfWork unitOfWork, 
            IMailService mailService, 
            IGenerateOtpService generateOtpService, 
            Utilies utilies,
            ICurrentUserService currentUserService)
        {
            this._unitOfWork = unitOfWork;
            this._mailService = mailService;
            this._generateOtpService = generateOtpService;
            this._utilies = utilies;
            this._currentUserService = currentUserService;
        }

        public async Task<bool> Create(CreatePatientDto model)
        {
            _unitOfWork.BeginTransaction();
            try
            {
                var patient = new Patient();
                patient.FullName = model.FullName;
                patient.UserId = model.UserId;
                await _unitOfWork.Repository<Patient>().AddAsync(patient);

                _unitOfWork.Commit();

                return true;
            }
            catch
            {
                _unitOfWork.Rollback();
                return false;
            }
        }

        public async Task<PatientDetailsDto> GetPatientDetailByUserId(string id)
        {
            var patient = await _unitOfWork.Repository<Patient>().GetAll
                .Where(p => p.UserId.Equals(id))
                .Select(p => new PatientDetailsDto
                {
                    Id = p.Id,
                    UserId = p.UserId,
                    Address = p.Address ?? "Not update address",
                    Email = p.User.Email.Trim(),
                    FullName = p.FullName != null ? p.FullName.Trim() : "Not update name",
                    Gender = p.Gender == 0 ? "Male" : p.Gender == 1 ? "Female" : "Other",
                    NationalId = p.NationalId != null ? p.NationalId.Trim() : "Not update national id",
                    PhoneNumber = p.PhoneNumber ?? "Not update phone number",
                    DateOfBirth = p.DateOfBirth.ToString("dd/MM/yyyy"),
                    CreatedDate = p.CreatedDate.ToString("hh:mm tt dd/MM/yyyy"),
                    UpdatedDate = p.UpdatedDate.ToString("hh:mm tt dd/MM/yyyy"),
                    AvatarUrl = p.User.AvatarUrl
                }).FirstOrDefaultAsync();

            if (patient == null) throw new NotFoundException("patient", id);

            return patient;
        }

        public async Task<PatientDetailsDto> GetPatientDetailByPatientId(int id)
        {
            var patient = await _unitOfWork.Repository<Patient>().GetAll
                .Where(p => p.Id.Equals(id))
                .Select(p => new PatientDetailsDto
                {
                    Id = p.Id,
                    UserId = p.UserId,
                    Address = p.Address ?? "Not update address",
                    Email = p.User.Email.Trim(),
                    FullName = p.FullName != null ? p.FullName.Trim() : "Not update name",
                    Gender = p.Gender == 0 ? "Male" : p.Gender == 1 ? "Female" : "Other",
                    NationalId = p.NationalId != null ? p.NationalId.Trim() : "Not update national id",
                    PhoneNumber = p.PhoneNumber ?? "Not update phone number",
                    DateOfBirth = p.DateOfBirth.ToString("dd/MM/yyyy"),
                    CreatedDate = p.CreatedDate.ToString("hh:mm tt dd/MM/yyyy"),
                    UpdatedDate = p.UpdatedDate.ToString("hh:mm tt dd/MM/yyyy"),
                    AvatarUrl = p.User.AvatarUrl
                }).FirstOrDefaultAsync();

            if (patient == null) throw new NotFoundException("patient", id);

            return patient;
        }

        public async Task<OTP> SendActivateMail(string id, string email)
        {
            var otp = await _generateOtpService.GenerateOtp(id);
            var formMail = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "EmailTemplates/ActivateMailSample.htm"));
            formMail = formMail.Replace("#date#", DateTime.Now.ToString());
            formMail = formMail.Replace("#otpcode#", otp.Code);

            await _mailService.SendEmailAsync(new MailRequest
            {
                ToEmail = email,
                Body = formMail,
                Subject = "Send account verification code"
            });

            return otp;
        }

        public async Task<ApiResponse> ValidOTP(string id, OTP otp)
        {
            var valid = await _generateOtpService.ValidOtpCode(id, otp);
            var res = new ApiResponse { 
                IsSuccess = valid,
            };
            if(valid)
            {
                res = await UpdateStatus(id);
            }
            return res;
        }

        private async Task<ApiResponse> UpdateStatus(string id)
        {
            _unitOfWork.BeginTransaction();
            try
            {
                var patient = await _unitOfWork.Repository<Patient>().GetAll
                .Where(p => p.UserId == id)
                .FirstOrDefaultAsync();

                if (patient == null) throw new NotFoundException("Patient", id);
                patient.User.Status = StatusAccount.Activated;

                _unitOfWork.Commit();
                return new ApiResponse
                {
                    Id = id,
                    IsSuccess = true,
                    Message = "Activated your account successfully"
                };
            }
            catch(Exception ex)
            {
                _unitOfWork.Rollback();

                return new ApiResponse
                {
                    Id = id,
                    IsSuccess = false,
                    Message = ex.Message
                };
            }
        }

        public async Task<UpdatePatientDetailDto?> UpdatePatient(UpdatePatientDetailDto model)
        {
            _unitOfWork.BeginTransaction();
            try
            {
                var patient = await _unitOfWork.Repository<Patient>().GetByIdAsync(model.Id);
                patient.Address = model.Address;
                patient.PhoneNumber = model.PhoneNumber;
                patient.FullName = model.FullName;
                patient.NationalId = model.NationalId;
                patient.User.Email = model.Email;
                patient.DateOfBirth = DateTime.ParseExact(model.DateOfBirth, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                patient.Gender = model.Gender == "0" ? 0 : model.Gender == "1" ? 1 : 2;

                patient.User.AvatarUrl = model.AvatarUrl ?? patient.User.AvatarUrl;
                patient.User.Status = StatusAccount.EnoughInformation;

                model.AvatarUrl = patient.User.AvatarUrl;

                await _unitOfWork.Repository<Patient>().UpdateAsync(patient);

                _unitOfWork.Commit();
                return model;
            }
            catch
            {
                _unitOfWork.Rollback();
                return null;
            }
        }

        public Task<DatatableResponse<PatientTableDto>> GetAll(DataTablesParameters parameters)
        {
            var response = new DatatableResponse<PatientTableDto>();

            var searchValue = parameters.Search.Value == null ? "" : parameters.Search.Value?.ToLower().Trim();

            var records = _unitOfWork.Repository<Patient>().GetAll
                .Select(d => new PatientTableDto
                {
                    Id = d.Id,
                    FullName = d.FullName,
                    NationalId = d.NationalId,
                    Gender = d.Gender == 0 ? "Male" : d.Gender == 1 ? "Female" : "Other",
                    DateOfBirth = d.DateOfBirth,
                    PhoneNumber = d.PhoneNumber,
                    Email = d.User.Email,
                    Address = d.Address,
                    CreatedBy = d.CreatedBy,
                    UpdatedBy = d.UpdatedBy,
                    CreatedDate = d.CreatedDate,
                    UpdatedDate = d.UpdatedDate,
                    IsDeleted = d.IsDeleted,
                });

            var recordsTotal = records.Count();

            records = records.Where(d =>
                    d.Id.ToString().Trim().Contains(searchValue)
                    || d.FullName.Trim().ToLower().Contains(searchValue)
                    || d.Email.Trim().ToLower().Contains(searchValue)
                    || d.Gender.Trim().ToLower().Contains(searchValue)
                    || d.Address.Trim().ToLower().Contains(searchValue)
                    || d.NationalId.Trim().ToLower().Contains(searchValue)
                    || d.DateOfBirth.ToString().Trim().ToLower().Contains(searchValue)
                    || d.PhoneNumber.Trim().ToLower().Contains(searchValue)
                    || d.CreatedBy.Trim().ToLower().Contains(searchValue)
                    || d.CreatedDate.ToString().Trim().ToLower().Contains(searchValue)
                    || d.UpdatedBy.Trim().ToLower().Contains(searchValue)
                    || d.UpdatedDate.ToString().Trim().ToLower().Contains(searchValue)
                    || d.IsDeleted.ToString().Trim().ToLower().Contains(searchValue));


            // Filter with order column
            if (parameters.Order.Count() != 0)
                switch (parameters.Order[0].Column)
                {
                    case (2):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.FullName) : records.OrderByDescending(r => r.FullName);
                        break;
                    case (3):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.Gender) : records.OrderByDescending(r => r.Gender);
                        break;
                    case (4):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.DateOfBirth) : records.OrderByDescending(r => r.DateOfBirth);
                        break;
                    case (5):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.NationalId) : records.OrderByDescending(r => r.NationalId);
                        break;
                    case (6):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.PhoneNumber) : records.OrderByDescending(r => r.PhoneNumber);
                        break;
                    case (7):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.Address) : records.OrderByDescending(r => r.Address);
                        break;
                    case (8):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.CreatedBy) : records.OrderByDescending(r => r.CreatedBy);
                        break;
                    case (9):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.CreatedDate) : records.OrderByDescending(r => r.CreatedDate);
                        break;
                    case (10):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.UpdatedBy) : records.OrderByDescending(r => r.UpdatedBy);
                        break;
                    case (11):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.UpdatedDate) : records.OrderByDescending(r => r.UpdatedDate);
                        break;
                    case (12):
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.IsDeleted) : records.OrderByDescending(r => r.IsDeleted);
                        break;
                    default:
                        records = parameters.Order[0].Dir == "asc" ? records.OrderBy(r => r.Id) : records.OrderByDescending(r => r.Id);
                        break;
                }

            records = records
                .Skip(parameters.Start)
                .Take(parameters.Length);

            var data = records.ToList();

            data.ForEach(item =>
            {
                item.UpdatedBy = _currentUserService.GetFullName(item.UpdatedBy);
                item.CreatedBy = _currentUserService.GetFullName(item.CreatedBy);
            });

            response.RecordsTotal = recordsTotal;
            response.RecordsFiltered = recordsTotal;
            response.Data = data;

            return Task.FromResult(response);
        }
    }
}
