using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Interfaces.IService;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "admin")]
    public class AdminController : ControllerBase
    {
        private readonly IStatisticService _statisticService;

        public AdminController(IStatisticService widgetService)
        {
            this._statisticService = widgetService;
        }

        [HttpGet("get-statistic-resource-widgets")]
        public async Task<IActionResult> GetStatisticResourceWidgets()
        {
            return Ok(await _statisticService.StatisticResourceWidgets());
        }

        [HttpGet("get-statistic-appointment-widgets")]
        public async Task<IActionResult> GetStatisticAppointmentWidgets(string userId, string userType)
        {
            return Ok(await _statisticService.StatisticAppointmentWidgets(userId, userType));
        }

        [HttpGet("statistic-gender")]
        public async Task<IActionResult> StatisticGender()
        {
            return Ok(await _statisticService.StatisticGender());
        }

        [HttpPost("statistic-appointment")]
        public async Task<IActionResult> StatisticGender(AppointmentStatisticRequest request)
        {
            return Ok(await _statisticService.StatisticAppointment(request));
        }
    }
}
