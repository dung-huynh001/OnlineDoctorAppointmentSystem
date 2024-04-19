using AutoMapper;
using Castle.Core.Internal;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.Json;
using WebAPI.DTOs;
using WebAPI.Interfaces.IService;
using WebAPI.Models;
using WebAPI.Responses;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentService _appointmentService;
        private readonly ICurrentUserService _userService;
        private readonly IMapper _mapper;
        private readonly IAuthService _authService;
        private readonly IPatientService _patientService;

        public AppointmentController(
            IAppointmentService appointmentService, 
            ICurrentUserService userService, 
            IMapper mapper, 
            IAuthService authService,
            IPatientService patientService)
        {
            this._appointmentService = appointmentService;
            this._userService = userService;
            this._mapper = mapper;
            this._authService = authService;
            this._patientService = patientService;
        }

        [HttpPost("get-appointments/{id}")]
        public async Task<IActionResult> GetAppointments([FromRoute] string id, [FromQuery] string userType, [FromQuery] string type, DataTablesParameters parameters)
        {
            return Ok(await _appointmentService.GetAppointments(id, userType, type, parameters));
        }

        [HttpPost("make-appointment")]
        public async Task<ActionResult> MakeAppointment([FromForm]MakeAppointmentDto model)
        {
            var appointmentDate = model.AppointmentDate.ToString("hh:mm dd/MM/yyyy");

            await _appointmentService.SendAppointmentConfirmMail(model.DoctorId, model.PatientId, appointmentDate);

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
        public async Task<IActionResult> GetUpcomingAppointment([FromRoute]string id, string userType)
        {
            return Ok(await _appointmentService.GetUpcomingAppointment(id, userType));
        }

        [HttpGet("get-new-booking/{id}")]
        public async Task<IActionResult> GetNewBooking([FromRoute] string id)
        {
            return Ok(await _appointmentService.GetNewBooking(id));
        }

        [HttpGet("get-patients-to-fill-dropdown")]
        public async Task<IActionResult> GetPatients()
        {
            return Ok(await _appointmentService.GetPatients());
        }

        [HttpPost("get-appointment-event-by-doctor")]
        public async Task<IActionResult> GetAppointmentEventsByDoctor(EJ2Params param)
        {
            string currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var data = JsonSerializer.Serialize(await _appointmentService.GetAppointmentEventsByDoctor(param, currentUserId));
            return Ok(data);
        }

        [HttpPost("appointment-on-site")]
        public async Task<IActionResult> AppointmentOnSite(EJ2UpdateParams<AppointmentEventDto> param)
        {
            string currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return Ok(await _appointmentService.AppointmentOnSite(param, currentUserId));
        }

        [HttpPost("add-new-patient")]
        public async Task<IActionResult> AddNewPatient([FromForm]AddNewPatientDto model)
        {
            var registerModel = _mapper.Map<RegisterModel>(model);
            registerModel.UserType = "patient";
            var createAccountResponse = await _authService.RegisterAsync(registerModel);
            model.UserId = createAccountResponse.UserId;
            var addPatientResponse = await _appointmentService.AddNewPatient(model);
            if(!addPatientResponse.IsSuccess)
            {
                await _authService.DeleteUserAsync(createAccountResponse.UserId);
            }
            
            return Ok(addPatientResponse);
        }

        [HttpGet("update-appointment-status/{id}")]
        public async Task<IActionResult> UpdateAppointmentStatus([FromRoute] int id, string appointmentStatus)
        {
            return Ok(await _appointmentService.UpdateAppointmentStatus(id, appointmentStatus));
        }

        [HttpPatch("change-appointment-date")]
        public async Task<IActionResult> ChangeAppointmentDate([FromRoute]int id, DateTime appointmentDate)
        {
            return Ok(await _appointmentService.ChangeAppointmentDate(id, appointmentDate));
        }

        [HttpGet("get-diagnosis/{id}")]
        public async Task<IActionResult> GetDiagnosis([FromRoute]int id)
        {
            return Ok(await _appointmentService.GetDiagnosis(id));
        }

        [HttpGet("get-prescriptions/{id}")]
        public async Task<IActionResult> GetPrescriptions([FromRoute]int id)
        {
            return Ok(await _appointmentService.GetPrescriptions(id));
        }

        [HttpPatch("update-diagnosis/{id}")]
        public async Task<IActionResult> UpdateDiagnosis([FromRoute]int id, DiagnosisDto diagnosis)
        {
            return Ok(await _appointmentService.UpdateDiagnosis(id, diagnosis));
        }

        [HttpPost("update-prescriptions/{id}")]
        public async Task<IActionResult> UpdatePrescriptions([FromRoute]int id, List<PrescriptionDto> prescriptions)
        {
            return Ok(await _appointmentService.UpdatePrescriptions(id, prescriptions));
        }

        [HttpGet("get-frequency")]
        public async Task<IActionResult> GetFreq()
        {
            return Ok(await _appointmentService.GetFreq());
        }

        [HttpGet("get-unit")]
        public async Task<IActionResult> GetUnit()
        {
            return Ok(await _appointmentService.GetUnit());
        }
    }
}
