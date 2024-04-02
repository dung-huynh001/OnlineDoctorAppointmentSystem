using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Domain.Entities;
using WebAPI.DTOs;
using WebAPI.Exceptions;
using WebAPI.Interfaces.IService;
using WebAPI.Models;
using WebAPI.Validators;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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

        [HttpPost("get-department")]
        public async Task<IActionResult> Get(DataTablesParameters parameters)
        {
            var result = await _departmentService.Get(parameters);
            return Ok(result);
        }

        [HttpDelete("delete")]
        public async Task<ActionResult> Delete(int id)
        {
            return Ok(await _departmentService.Delete(id));
        }

        [HttpGet("restore")]
        public async Task<ActionResult> Restore(int id)
        {
            return Ok(await _departmentService.Restore(id));
        }

        [HttpPatch("update/{id}")]
        public async Task<ActionResult> Update([FromRoute]int id, [FromBody] UpdateDepartmentDto model)
        {
            return Ok(await _departmentService.Update(id, model));
        }

        [HttpGet("get-department-to-select")]
        public async Task<ActionResult>GetDepartmentToSelect()
        {
            return Ok(await _departmentService.GetDepartmentToSelect());
        }
    }
}
