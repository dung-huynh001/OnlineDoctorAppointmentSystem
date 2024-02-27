using WebAPI.Domain.Common;

namespace WebAPI.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<T> Repository<T>() where T: BaseEntity;
        void BeginTransaction();
        void Commit();
        void Rollback();
        Task<int> SaveAsync(CancellationToken cancellationToken);
    }
}
