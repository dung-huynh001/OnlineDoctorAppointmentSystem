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
            services.AddTransient<DoctorAppointmentSystemContext>();

            services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>))
                .AddTransient(typeof(IUnitOfWork), typeof(UnitOfWork));
            services.AddScoped<IMailService, MailService>();
            services.AddSingleton(typeof(ILogger<>), typeof(Logger<>));
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();




            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IDoctorService, DoctorService>();
            services.AddScoped<IPatientService, PatientService>();
            services.AddScoped<IDepartmentService, DepartmentService>();
            services.AddScoped<IScheduleService, ScheduleService>();
            services.AddScoped<IAppointmentService, AppointmentService>();
            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddScoped<IUploadService, UploadService>();
            services.AddScoped<IGenerateOtpService, GenerateOtpService>();

        }
    }
}
