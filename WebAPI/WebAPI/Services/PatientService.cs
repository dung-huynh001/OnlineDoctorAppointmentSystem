using Microsoft.EntityFrameworkCore;
using System.Globalization;
using WebAPI.Domain.Entities;
using WebAPI.Domain.Enums;
using WebAPI.DTOs;
using WebAPI.Exceptions;
using WebAPI.Implementations;
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

        public PatientService(IUnitOfWork unitOfWork, IMailService mailService, IGenerateOtpService generateOtpService)
        {
            this._unitOfWork = unitOfWork;
            this._mailService = mailService;
            this._generateOtpService = generateOtpService;
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

        public async Task<PatientDetailsDto> GetPatientDetails(string id)
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

        public async Task<bool> ValidOTP(string id, OTP otp)
        {
            return await _generateOtpService.ValidOtpCode(id, otp);
        }

        public async Task<ApiResponse> UpdatePatientInfo(UpdatePatientDetailsDto model)
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
                await _unitOfWork.Repository<Patient>().UpdateAsync(patient);

                _unitOfWork.Commit();
                return new ApiResponse
                {
                    IsSuccess = true,
                    Message = "Updated patient information successfully",
                    Id = model.Id.ToString(),
                };
            }
            catch(Exception ex)
            {
                _unitOfWork.Rollback();
                return new ApiResponse
                {
                    IsSuccess = false,
                    Message = ex.Message,
                };
            }
        }
    }
}
