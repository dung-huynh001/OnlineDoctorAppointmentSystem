using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using WebAPI.DTOs;
using WebAPI.Exceptions;
using WebAPI.Interfaces.IService;
using WebAPI.Models;
using WebAPI.Responses;
using WebAPI.Validators;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly IScheduleService _scheduleService;

        public ScheduleController(IScheduleService scheduleService)
        {
            this._scheduleService = scheduleService;
        }

        [HttpPost("add-schedule")]
        public async Task<ActionResult<ApiResponse>> AddSchedule(CreateScheduleDto model)
        {
            var validator = new AddScheduleValidator();
            /*var validatorResult = validator.Validate(model);
            if (!validatorResult.IsValid)
            {
                throw new ValidationException(validatorResult);
            }*/

            return Ok(await _scheduleService.AddSchedule(model));
        }

        [HttpGet("get-schedules-of-doctor")]
        public async Task<ActionResult<GetSchedulesByDoctorIdDto>> GetSchedulesByDoctorId(int doctorId)
        {
            return Ok(await _scheduleService.GetSchedulesByDoctorId(doctorId));
        }

        [HttpPost("get-doctor-list")]
        public async Task<IActionResult> GetDoctorList(ScheduleFilter filter)
        {
            return Ok(await _scheduleService.GetDoctorList(filter));
        }
    }
}
