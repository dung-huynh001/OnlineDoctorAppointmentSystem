using WebAPI.Implementations;
using WebAPI.Infrastructure.Context;
using WebAPI.Interfaces;
using WebAPI.Interfaces.IService;
using WebAPI.Services;

namespace WebAPI
{
    public static class IServiceCollectionExtensions
    {
        public static void AddDependencyInjection(this IServiceCollection services)
        {
            services.AddScoped<DoctorAppointmentSystemContext>();

            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>))
                .AddScoped(typeof(IUnitOfWork), typeof(UnitOfWork));

            services.AddScoped<IAuthService, AuthService>();
            services.AddSingleton(typeof(ILogger<>), typeof(Logger<>));
            services.AddScoped<IDoctorService, DoctorService>();
            services.AddScoped<IPatientService, PatientService>();

        }
    }
}
