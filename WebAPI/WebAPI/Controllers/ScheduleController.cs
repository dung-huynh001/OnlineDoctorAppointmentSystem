﻿using Microsoft.AspNetCore.Authorization;
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

        [Authorize(Roles = "admin")]
        [HttpPost("add-schedule")]
        public async Task<ActionResult<ApiResponse>> AddSchedule(CreateScheduleDto model)
        {
            return Ok(await _scheduleService.AddSchedule(model));
        }

        [HttpGet("get-schedules-of-doctor")]
        public async Task<ActionResult> GetSchedulesByDoctorId(int doctorId)
        {
            return Ok(await _scheduleService.GetScheduleEventsByDoctor(doctorId));
        }

        [HttpPost("get-schedules-of-doctors")]
        public async Task<ActionResult> GetSchedulesOfDoctors(EJ2Params param)
        {
            var data = JsonSerializer.Serialize(await _scheduleService.GetSchedulesOfDoctors(param));
            return Ok(data);
        }

        [HttpPost("get-doctor-list")]
        public async Task<IActionResult> GetDoctorList(ScheduleFilter filter)
        {
            return Ok(await _scheduleService.GetDoctorList(filter));
        }

        [HttpGet("get-schedule-shift-by-date/{doctorId}")]
        public async Task<IActionResult> GetScheduleShiftByDate ([FromRoute]int doctorId, [FromQuery]DateTime date)
        {
            return Ok(await _scheduleService.GetScheduleShiftsByDate(doctorId, date));
        }

        [HttpGet("get-doctors")]
        public async Task<IActionResult> GetDoctors()
        {
            return Ok(await _scheduleService.GetDoctors());
        }

    }
}
