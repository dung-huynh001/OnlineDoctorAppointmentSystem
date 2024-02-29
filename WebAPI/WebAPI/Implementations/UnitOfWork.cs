using Microsoft.EntityFrameworkCore.Storage;
using System.Collections;
using WebAPI.Domain.Common;
using WebAPI.Infrastructure.Context;
using WebAPI.Interfaces;

namespace WebAPI.Implementations
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DoctorAppointmentSystemContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private Hashtable _repository;
        private IDbContextTransaction _transaction;

        public UnitOfWork(DoctorAppointmentSystemContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public IGenericRepository<T> Repository<T>() where T : BaseEntity
        {
            if(_repository == null)
            {
                _repository = new Hashtable();
            }

            var type = typeof(T);

            if(!_repository.ContainsKey(type))
            {
                var repositoryType = typeof(GenericRepository<>);

                var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType(typeof(T)), _context);

                _repository.Add(type, repositoryInstance);
            }

            return (IGenericRepository<T>)_repository[type]!;
        }

        public void BeginTransaction()
        {
            _transaction = _context.Database.BeginTransaction();
        }

        public void Commit()
        {
            try
            {
                var editor = _httpContextAccessor.HttpContext!.User.FindFirst("uid")?.Value;
                _context.SaveChangesAsync(editor ?? "admin").GetAwaiter().GetResult();
                _transaction.Commit();
            }
            catch
            {
                _transaction.Rollback();
                throw;
            }
            finally
            {
                _transaction.Dispose();
            }
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public void Rollback()
        {
            _transaction.Rollback();
            _transaction.Dispose();
        }
    }
}
