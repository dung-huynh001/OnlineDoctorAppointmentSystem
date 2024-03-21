using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Globalization;
using WebAPI.DTOs;
using WebAPI.Exceptions;
using WebAPI.Interfaces.IService;
using WebAPI.Models;
using WebAPI.Responses;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctorService _doctorService;
        private readonly IUploadService _uploadService;
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;

        public DoctorController(
            IDoctorService doctorService, 
            IUploadService uploadService, 
            IAuthService authService, 
            IMapper mapper)
        {
            this._doctorService = doctorService;
            this._uploadService = uploadService;
            this._authService = authService;
            this._mapper = mapper;
        }

        [HttpPost("get-all")]
        public async Task<IActionResult> GetAll(DataTablesParameters parameters)
        {
            return Ok(await _doctorService.GetAll(parameters));
        }

        [HttpPost("get-doctor-on-duty")]
        public async Task<IActionResult> GetDoctorListOnDuty(string date)
        {
            string formatString = "M/d/yyyy, h:mm:ss tt";

            DateTime dateTime = DateTime.ParseExact(date, formatString, CultureInfo.InvariantCulture);

            return Ok(await _doctorService.GetDoctorsOnDuty(dateTime));
        }

        [HttpPost("create")]
        public async Task<ActionResult> Create([FromForm]CreateDoctorDto model)
        {
            var img = model.Avatar;
            if (img == null || img.Length == 0)
            {
                throw new Exception("Please select doctor image");
            }
            string uniqueName = Guid.NewGuid().ToString() + img.FileName;
            string folderName = "Uploads/Avatars";

            string filePath = Path.Combine(Directory.GetCurrentDirectory(), folderName, uniqueName);
            string relativePath = Path.Combine(folderName, uniqueName);
            relativePath = relativePath.Replace("\\", "/");

            var registerModel = _mapper.Map<RegisterModel>(model);
            registerModel.AvatarUrl = relativePath;
            var res = await _authService.RegisterAsync(registerModel);


            model.UserId = res.UserId;
            if(!await _doctorService.Create(model))
            {
                await _authService.DeleteUserAsync(res.UserId);
                throw new Exception("Create doctor failed");
            }

            await _uploadService.UploadImageToFolderAsync(model.Avatar, filePath);
            
            return Ok(new ApiResponse
            {
                IsSuccess = true,
                Message = $"Created new doctor successfull",
                Id = model.UserId
            });
        }

        [HttpGet("get-doctor-details/{id}")]
        public async Task<IActionResult> GetDoctorDetail([FromRoute]int id)
        {
            return Ok(await _doctorService.GetDoctorDetails(id));
        }

        [HttpPatch("update-personal-info/{id}")]
        public async Task<IActionResult> UpdatePersonalInfo([FromRoute] int id, [FromForm] DoctorPersonalInfo data)
        {
            

            if (!await _doctorService.UpdatePersonalInfo(data))
            {
                throw new Exception("Update doctor failed");
            }
            var img = data.Avatar;
            if (img != null && img.Length != 0)
            {
                string uniqueName = Guid.NewGuid().ToString() + img.FileName;
                string folderName = "Uploads/Avatars";

                string filePath = Path.Combine(Directory.GetCurrentDirectory(), folderName, uniqueName);
                string relativePath = Path.Combine(folderName, uniqueName);
                relativePath = relativePath.Replace("\\", "/");
                data.AvatarUrl = relativePath;
                if (!await _authService.UpdateEmailAndAvatarUrlAsync(data.UserId, data.Email, data.AvatarUrl))
                {
                    throw new Exception("Updated email and avatar url failed");
                }
                await _uploadService.UploadImageToFolderAsync(data.Avatar, filePath);
            }

            return Ok(new ApiResponse
            {
                IsSuccess = true,
                Message = "Updated doctor sucessfully",
                Id = data.Id.ToString()
            });
        }

        [HttpPatch("update-work-info/{id}")]
        public async Task<IActionResult> UpdateWorkInfo([FromForm]WorkInfoDto data)
        {
            return Ok(await _doctorService.UpdateWorkInfo(data));
        }
    }
}
