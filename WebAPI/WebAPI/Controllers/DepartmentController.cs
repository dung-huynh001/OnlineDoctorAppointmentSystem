using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Exceptions;
using WebAPI.Interfaces.IService;
using WebAPI.Validators;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentService _departmentService;

        public DepartmentController(IDepartmentService departmentService)
        {
            this._departmentService = departmentService;
        }

        [HttpPost("create")]
        public async Task<ActionResult> Create(CreateDepartmentDto model)
        {
            var validator = new CreateDepartmentValidator();
            var validatorResult = await validator.ValidateAsync(model);
            if(!validatorResult.IsValid)
            {
                throw new ValidationException(validatorResult);
            }
            return Ok(await _departmentService.Create(model));
        }

        [HttpGet("get-all")]
        public async Task<ActionResult> GetAll()
        {
            return Ok(await _departmentService.GetAll());
        } 
    }
}
