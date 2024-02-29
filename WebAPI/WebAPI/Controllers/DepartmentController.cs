using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        public DepartmentController()
        {
            
        }

        [HttpPost("department")]
        public async Task<ActionResult> Create(CreateDepartmentDto model)
        {


            return Ok();
        }
    }
}
