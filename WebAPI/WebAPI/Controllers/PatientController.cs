using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using WebAPI.DTOs;
using WebAPI.Interfaces.IService;
using WebAPI.Models;
using WebAPI.Responses;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PatientController : ControllerBase
    {
        private readonly IPatientService _patientService;
        private readonly IUploadService _uploadService;
        private readonly IAuthService _authService;

        public PatientController(IPatientService patientService, IUploadService uploadService, IAuthService authService)
        {
            this._patientService = patientService;
            this._uploadService = uploadService;
            this._authService = authService;
        }

        [HttpGet("get-patient-details")]
        public async Task<IActionResult> GetPatientDetails(string id)
        {
            return Ok(await _patientService.GetPatientDetails(id));
        }

        [HttpPatch("update-patient-info/{id}")]
        public async Task<IActionResult> UpdatePatientInfo([FromForm]UpdatePatientDetailsDto model)
        {
            var img = model.Avatar;
            if (img != null && img.Length != 0)
            {
                string uniqueName = Guid.NewGuid().ToString() + img.FileName;
                string folderName = "Uploads/Avatars";

                string filePath = Path.Combine(Directory.GetCurrentDirectory(), folderName, uniqueName);
                string relativePath = Path.Combine(folderName, uniqueName);
                relativePath = relativePath.Replace("\\", "/");
                model.AvatarUrl = relativePath;
                if (!await _authService.UpdateEmailAndAvatarUrlAsync(model.UserId, model.Email, model.AvatarUrl))
                {
                    throw new Exception("Updated email and avatar url failed");
                }
                await _uploadService.UploadImageToFolderAsync(model.Avatar!, filePath);
            }
            return Ok(await _patientService.UpdatePatientInfo(model));
        }

        [HttpGet("send-activate-email/{id}")]
        public async Task<IActionResult> SendActivateEmail([FromRoute]string id, string email)
        {
            var otp = await _patientService.SendActivateMail(id, email);
            return Ok(otp.ExpiredTime);
        }

        [HttpPost("valid-otp/{id}")]
        public async Task<IActionResult> ValidOTP([FromRoute]string id, OTP otp)
        {
            return Ok(await _patientService.ValidOTP(id, otp));
        }
    }
}
