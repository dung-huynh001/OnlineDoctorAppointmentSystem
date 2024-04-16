﻿using WebAPI.DTOs;
using WebAPI.Models;
using WebAPI.Responses;

namespace WebAPI.Interfaces.IService
{
    public interface IAppointmentService
    {

        Task<AppointmentDetailDto> GetAppointmentDetail(int appointmentId);
        Task<DatatableResponse<AppointmentTableDto>> GetAppointments(string id, string userType, string type, DataTablesParameters parameters);
        Task<AppointmentPatientDto> GetPatientDetailToAppointment(string currentUserId);
        Task<ApiResponse> MakeAppointment(MakeAppointmentDto model);
        Task SendAppointmentConfirmMail(int doctorId, int patientId, string appointmentDate);
        Task<ApiResponse> CancelAppointment(int id);
        Task<ViewAppointmentDto> ViewAppointmentDetails(int id);
        Task<List<int>> LoadWidgets(string id, string userType);
        Task<List<RecentlyAppointmentDto>> GetRecentlyAppointment(string id);
        Task<List<UpcomingAppointmentDto>> GetUpcomingAppointment(string id, string userType);
        Task<List<NewBookingDto>> GetNewBooking(string id);
        Task<List<PatientToFillDropdownDto>> GetPatients();
        Task<List<AppointmentEventDto>> GetAppointmentEventsByDoctor(EJ2Params param, string currentUserId);
        Task<ApiResponse> AddNewPatient(AddNewPatientDto model);
        Task<ApiResponse> AppointmentOnSite(EJ2UpdateParams<AppointmentEventDto> param, string currrentUserId);
        Task<ApiResponse> MarkAsConfirmed(int id);
        Task<ApiResponse> MarkAsCancel(int id);
    }
}
