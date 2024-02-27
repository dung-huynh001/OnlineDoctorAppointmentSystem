using WebAPI.Implementations;
using WebAPI.Interfaces;
using WebAPI.Services;

namespace WebAPI
{
    public static class IServiceCollectionExtensions
    {
        public static void AddDependencyInjection(this IServiceCollection services)
        {
            services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>))
                .AddTransient(typeof(IUnitOfWork), typeof(UnitOfWork));
        }
    }
}
