using WebAPI.Common;
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
            services.AddTransient<DoctorAppointmentSystemContext>()
                    .AddTransient<Utilies>();

            services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>))
                    .AddTransient(typeof(IUnitOfWork), typeof(UnitOfWork));


            services.AddSingleton(typeof(ILogger<>), typeof(Logger<>))
                    .AddSingleton<IHttpContextAccessor, HttpContextAccessor>();



            services.AddTransient<IMailService, MailService>()
                    .AddTransient<IAuthService, AuthService>()
                    .AddTransient<IDoctorService, DoctorService>()
                    .AddTransient<IPatientService, PatientService>()
                    .AddTransient<IDepartmentService, DepartmentService>()
                    .AddTransient<IScheduleService, ScheduleService>()
                    .AddTransient<IAppointmentService, AppointmentService>()
                    .AddTransient<ICurrentUserService, CurrentUserService>()
                    .AddTransient<IUploadService, UploadService>()
                    .AddTransient<IGenerateOtpService, GenerateOtpService>()
                    .AddTransient<IStatisticService, StatisticService>();

        }
    }
}
