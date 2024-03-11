﻿using WebAPI.DTOs;

namespace WebAPI.Interfaces.IService
{
    public interface IAppointmentService
    {
        Task<List<GetAppointmentToDrawTableDto>> GetAll();
        Task<List<GetAppointmentToDrawTableDto>> GetCompleted();
        Task<List<GetAppointmentToDrawTableDto>> GetWaiting();
        Task<List<GetAppointmentToDrawTableDto>> GetCancelled();
        Task<List<GetAppointmentToDrawTableDto>> GetOutOfDate();
        Task<List<GetAppointmentToDrawTableDto>> GetAll(int id, string userType);
        Task<List<GetAppointmentToDrawTableDto>> GetCompleted(int id, string userType);
        Task<List<GetAppointmentToDrawTableDto>> GetWaiting(int id, string userType);
        Task<List<GetAppointmentToDrawTableDto>> GetCancelled(int id, string userType);
        Task<List<GetAppointmentToDrawTableDto>> GetOutOfDate(int id, string userType);
        Task<GetAppointmentDetailDto> GetAppointmentDetail(int appointmentId);
    }
}