﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Exceptions;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly DoctorService _doctorService;

        public DoctorController(DoctorService doctorService)
        {
            this._doctorService = doctorService;
        }

        [HttpGet("get-doctor-on-duty")]
        public async Task<ActionResult<List<DoctorOnDutyDto>>> GetDoctorListOnDuty(DateTime date, TimeSpan time)
        {
            var dateTime = date.Add(time);

            return Ok(await _doctorService.GetDoctorListOnDuty(dateTime));
        }
    }
}