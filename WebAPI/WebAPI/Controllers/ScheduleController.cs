using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    public class ScheduleController : ControllerBase
    {
        private readonly IScheduleService _scheduleService;

        public ScheduleController(IScheduleService scheduleService)
        {
            this._scheduleService = scheduleService;
        }

        [HttpGet("get-schedule-by-date/{doctorId}")]
        public async Task<IActionResult> GetScheduleByDate([FromRoute]int doctorId, DateTime date)
        {
            return Ok(await _scheduleService.GetScheduleByDate(doctorId, date));
        }

        [HttpGet("get-schedule-by-date-and-user-id/{doctorId}")]
        public async Task<IActionResult> GetScheduleByDateAndUserId([FromRoute] string doctorId, DateTime date)
        {
            return Ok(await _scheduleService.GetScheduleByDateAndUserId(doctorId, date));
        }

        [Authorize(Roles = "admin")]
        [HttpPost("add-schedule")]
        public async Task<ActionResult<ApiResponse>> AddSchedule(CreateScheduleDto model)
        {
            return Ok(await _scheduleService.AddSchedule(model));
        }

        [HttpGet("get-schedule-events-of-doctor")]
        public async Task<ActionResult> GetScheduleEventsByDoctor(int doctorId)
        {
            return Ok(await _scheduleService.GetScheduleEventsByDoctor(doctorId));
        }

        [HttpPost("get-all-doctor-schedules")]
        public async Task<ActionResult> GetAllDoctorSchedules(EJ2Params param)
        {
            var data = JsonSerializer.Serialize(await _scheduleService.GetAllDoctorSchedules(param));
            return Ok(data);
        }

        [HttpPost("get-doctor-list")]
        public async Task<IActionResult> GetDoctors(ScheduleFilter filter)
        {
            return Ok(await _scheduleService.GetDoctors(filter));
        }

        [HttpGet("get-schedule-shift-by-date/{doctorId}")]
        public async Task<IActionResult> GetScheduleShiftsByDate ([FromRoute]int doctorId, [FromQuery]DateTime date)
        {
            return Ok(await _scheduleService.GetScheduleShiftsByDate(doctorId, date));
        }

        [HttpGet("get-doctors")]
        public async Task<IActionResult> GetDoctors()
        {
            return Ok(await _scheduleService.GetDoctors());
        }

        [HttpGet("get-appointment-patients/{doctorId}")]
        public async Task<IActionResult> GetAppointmentPatients([FromRoute]string doctorId)
        {
            return Ok(await _scheduleService.GetAppointmentPatients(doctorId));
        }
    }
}
