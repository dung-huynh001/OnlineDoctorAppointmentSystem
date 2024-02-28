using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        public DoctorController()
        {
            
        }

        /*public async Task<ActionResult<List<DoctorOnDutyDto>>> GetDoctorListOnDuty(DateTime date, TimeSpan time)
        {

        }*/
    }
}
