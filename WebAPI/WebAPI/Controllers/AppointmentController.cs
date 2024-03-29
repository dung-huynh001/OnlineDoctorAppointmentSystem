﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Interfaces.IService;
using WebAPI.Models;
using WebAPI.Responses;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentService _appointmentService;
        private readonly IUserService _userService;

        public AppointmentController(IAppointmentService appointmentService, IUserService userService)
        {
            this._appointmentService = appointmentService;
            this._userService = userService;
        }

        [HttpPost("get-appointments/{id}")]
        public async Task<IActionResult> GetAppointments([FromRoute] string id, [FromQuery] string userType, [FromQuery] string type, DataTablesParameters parameters)
        {
            return Ok(await _appointmentService.GetAppointments(id, userType, type, parameters));
        }

        [HttpPost("make-appointment")]
        public async Task<ActionResult> MakeAppointment([FromForm]MakeAppointmentDto model)
        {
            return Ok(await _appointmentService.MakeAppointment(model));
        }

        [HttpGet("cancel-appointment/{id}")]
        public async Task<IActionResult> CancelAppointment([FromRoute]int id)
        {
            return Ok(await _appointmentService.CancelAppointment(id));
        }

        [HttpGet("view-appointment-details/{id}")]
        public async Task<IActionResult> ViewAppointmentDetails(int id)
        {
            return Ok(await _appointmentService.ViewAppointmentDetails(id));
        }

        [HttpGet("load-widgets/{id}")]
        public async Task<IActionResult> LoadWidgets([FromRoute]string id, string userType)
        {
            return Ok(await _appointmentService.LoadWidgets(id, userType));
        }

        [HttpGet("get-recently-appointments/{id}")]
        public async Task<IActionResult> GetRecentlyAppointments([FromRoute]string id)
        {
            return Ok(await _appointmentService.GetRecentlyAppointment(id));
        }
        [HttpGet("get-upcoming-appointments/{id}")]
        public async Task<IActionResult> GetUpcomingAppointment([FromRoute]string id)
        {
            return Ok(await _appointmentService.GetUpcomingAppointment(id));
        }
    }
}
