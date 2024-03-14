using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
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

        [HttpGet("get-doctor-on-duty")]
        public async Task<ActionResult<List<DoctorOnDutyDto>>> GetDoctorListOnDuty(DateTime date)
        {

            return Ok(await _doctorService.GetDoctorListOnDuty(date));
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
    }
}
