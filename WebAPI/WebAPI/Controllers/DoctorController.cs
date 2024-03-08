using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Exceptions;
using WebAPI.Interfaces.IService;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctorService _doctorService;

        public DoctorController(IDoctorService doctorService)
        {
            this._doctorService = doctorService;
        }

        [HttpGet("get-doctor-on-duty")]
        public async Task<ActionResult<List<DoctorOnDutyDto>>> GetDoctorListOnDuty(DateTime date)
        {

            return Ok(await _doctorService.GetDoctorListOnDuty(date));
        }
    }
}
