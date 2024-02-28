using WebAPI.Domain.Entities;
using WebAPI.DTOs;
using WebAPI.Infrastructure.Context;
using WebAPI.Interfaces;
using WebAPI.Interfaces.IRepositories;

namespace WebAPI.Implementations.Repositories
{
    public class DoctorRepository : GenericRepository<Doctor>, IDoctorRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public DoctorRepository(DoctorAppointmentSystemContext context, IUnitOfWork unitOfWork) : base(context)
        {
            this._unitOfWork = unitOfWork;
        }

        public List<DoctorOnDutyDto>GetDoctorListOnDuty(DateTime dateTime)
        {
            var result = new List<DoctorOnDutyDto>();
            
            

            return result;
        }
    }
}
