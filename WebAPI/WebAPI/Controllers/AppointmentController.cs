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


        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _appointmentService.GetAll());
        }

        [HttpGet("completed")]
        public async Task<List<GetAppointmentToDrawTableDto>> GetCompleted()
        {
            return await _appointmentService.GetCompleted();
        }

        [HttpGet("cancel")]
        public async Task<List<GetAppointmentToDrawTableDto>> GetCancelled()
        {
            return await _appointmentService.GetCancelled();
        }

        [HttpGet("out-of-date")]
        public async Task<List<GetAppointmentToDrawTableDto>> GetOutOfDate()
        {
            return await _appointmentService.GetOutOfDate();
        }

        [HttpGet("waiting")]
        public async Task<List<GetAppointmentToDrawTableDto>> GetWaiting()
        {
            return await _appointmentService.GetWaiting();
        }

        [HttpPost("get-appointments/{id}")]
        public async Task<IActionResult> GetAppointments([FromRoute]string id, [FromQuery]string userType, [FromQuery]string type, DataTablesParameters parameters)
        {
            return Ok(await _appointmentService.GetAppointments(id, userType, type, parameters));
        }

        [HttpGet("completed/{id}/{userType}")]
        public async Task<List<GetAppointmentToDrawTableDto>> GetCompleted(string id, string userType)
        {
            switch (userType.Trim().ToLower())
            {
                case "patient":
                    var patient = await _userService.GetPatientInfo(id);
                    return await _appointmentService.GetCompleted(patient.Id, userType);
                case "doctor":
                    var doctor = await _userService.GetPatientInfo(id);
                    return await _appointmentService.GetCompleted(doctor.Id, userType);
                default:
                    throw new Exception("UserType is invalid");
            }
        }

        [HttpGet("cancel/{id}/{userType}")]
        public async Task<List<GetAppointmentToDrawTableDto>> GetCancelled(string id, string userType)
        {
            switch (userType.Trim().ToLower())
            {
                case "patient":
                    var patient = await _userService.GetPatientInfo(id);
                    return await _appointmentService.GetCancelled(patient.Id, userType);
                case "doctor":
                    var doctor = await _userService.GetPatientInfo(id);
                    return await _appointmentService.GetCancelled(doctor.Id, userType);
                default:
                    throw new Exception("UserType is invalid");
            }
        }

        [HttpGet("out-of-date/{id}/{userType}")]
        public async Task<List<GetAppointmentToDrawTableDto>> GetOutOfDate(string id, string userType)
        {
            switch (userType.Trim().ToLower())
            {
                case "patient":
                    var patient = await _userService.GetPatientInfo(id);
                    return await _appointmentService.GetOutOfDate(patient.Id, userType);
                case "doctor":
                    var doctor = await _userService.GetPatientInfo(id);
                    return await _appointmentService.GetOutOfDate(doctor.Id, userType);
                default:
                    throw new Exception("UserType is invalid");
            }
        }

        [HttpGet("waiting/{id}/{userType}")]
        public async Task<List<GetAppointmentToDrawTableDto>> GetWaiting(string id, string userType)
        {
            switch (userType.Trim().ToLower())
            {
                case "patient":
                    var patient = await _userService.GetPatientInfo(id);
                    return await _appointmentService.GetWaiting(patient.Id, userType);
                case "doctor":
                    var doctor = await _userService.GetPatientInfo(id);
                    return await _appointmentService.GetWaiting(doctor.Id, userType);
                default:
                    throw new Exception("UserType is invalid");
            }
        }

        [HttpPost("make-appointment")]
        public async Task<ActionResult> MakeAppointment([FromForm]MakeAppointmentDto model)
        {
            return Ok(await _appointmentService.MakeAppointment(model));
        }
    }
}
