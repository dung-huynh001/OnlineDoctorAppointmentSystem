using Microsoft.EntityFrameworkCore;
using WebAPI.Domain.Common;
using WebAPI.Exceptions;
using WebAPI.Infrastructure.Context;
using WebAPI.Interfaces;

namespace WebAPI.Implementations
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : BaseEntity
    {
        private readonly DoctorAppointmentSystemContext _context;

        public GenericRepository(DoctorAppointmentSystemContext context)
        {
            _context = context;
        }

        public IQueryable<TEntity> GetAll => _context.Set<TEntity>();

        public async Task AddAsync(TEntity entity)
        {
            await _context.AddAsync(entity);
        }

        public void AddRange(IEnumerable<TEntity> entities)
        {
            _context.Set<TEntity>().AddRange(entities);
        }

        public Task<TEntity> DeleteAsync(TEntity entity)
        {
            var exist =  _context.Set<TEntity>().Find(entity.Id);
            if (exist != null)
            {
                exist.IsDeleted = true;
            }

            return Task.FromResult(entity);
        }

        public async Task<int> DeleteByIdAsync(int id)
        {
            var exist = await _context.Set<TEntity>().FindAsync(id);
            if (exist != null)
            {
                exist.IsDeleted = true;
                return exist.Id;
            }
            return 0;
        }

        public async Task<List<TEntity>> GetAllAsync()
        {
            return await _context.Set<TEntity>().ToListAsync();
        }

        public async Task<TEntity> GetByIdAsync(int id)
        {
            var entity = await _context.Set<TEntity>().FindAsync(id);
            if(entity == null)
            {
                var typeOfEntity = typeof(TEntity).ToString();
                throw new NotFoundException(typeOfEntity.Substring(typeOfEntity.LastIndexOf(".") + 1) + " with ID =", id);
            }
            return entity;
        }

        public async Task<TEntity> UpdateAsync(TEntity entity)
        {
            TEntity? exist = await _context.Set<TEntity>().FindAsync(entity.Id);
            if (exist == null || exist.IsDeleted)
            {
                throw new NotFoundException(typeof(TEntity).ToString(), entity.Id);
            }
            _context.Entry(exist).CurrentValues.SetValues(entity);

            return entity;
        }
    }
}
