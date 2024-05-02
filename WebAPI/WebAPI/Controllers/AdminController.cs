using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces.IService;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "admin")]
    public class AdminController : ControllerBase
    {
        private readonly IStatisticService _widgetService;

        public AdminController(IStatisticService widgetService)
        {
            this._widgetService = widgetService;
        }

        [HttpGet("get-statistic-resource-widgets")]
        public async Task<IActionResult> GetStatisticResourceWidgets()
        {
            return Ok(await _widgetService.StatisticResourceWidgets());
        }

        [HttpGet("get-statistic-appointment-widgets")]
        public async Task<IActionResult> GetStatisticAppointmentWidgets(string userId, string userType)
        {
            return Ok(await _widgetService.StatisticAppointmentWidgets(userId, userType));
        }
    }
}
