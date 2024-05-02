using WebAPI.Domain.Entities;
using WebAPI.Interfaces;

namespace WebAPI.Common
{
    public class Utilies
    {
        public Utilies()
        {
            
        }

        public string GetFullName(string userId, IUnitOfWork unitOfWork)
        {
            var patient = unitOfWork.Repository<Patient>().GetAll.SingleOrDefault(p => p.UserId == userId);
            if(patient != null)
            {
                return patient.FullName?? "--unknown--";
            }
            var doctor = unitOfWork.Repository<Doctor>().GetAll.SingleOrDefault(p => p.UserId == userId);
            if(doctor != null)
            {
                return doctor.FullName;
            }

            return "admin";
        }
    }
}
