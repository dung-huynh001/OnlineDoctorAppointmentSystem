using WebAPI.Domain.Entities;
using WebAPI.DTOs;
using WebAPI.Implementations;
using WebAPI.Interfaces;
using WebAPI.Interfaces.IService;

namespace WebAPI.Services
{
    public class PatientService : IPatientService
    {
        private readonly IUnitOfWork _unitOfWork;

        public PatientService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public async Task<bool> Create(CreatePatientDto model)
        {
            _unitOfWork.BeginTransaction();
            try
            {
                var patient = new Patient();
                patient.FullName = model.FullName;
                patient.UserId = model.UserId;
                await _unitOfWork.Repository<Patient>().AddAsync(patient);

                _unitOfWork.Commit();

                return true;
            }
            catch(Exception ex)
            {
                _unitOfWork.Rollback();
                return false;
            }
        }
    }
}
