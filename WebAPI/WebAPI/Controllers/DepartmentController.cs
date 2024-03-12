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

        [HttpPost("get-department")]
        public async Task<ActionResult> Get(DataTablesParameters parameters)
        {
            return Ok(await _departmentService.Get(parameters));
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

    }
}
