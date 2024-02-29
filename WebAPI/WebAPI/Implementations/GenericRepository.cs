﻿using Microsoft.EntityFrameworkCore;
using WebAPI.Domain.Common;
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

        public Task<TEntity> DeleteAsync(TEntity entity)
        {
            /*_context.Set<TEntity>().Remove(entity);*/
            var exist =  _context.Set<TEntity>().Find(entity.Id);
            if (exist != null)
            {
                exist.IsDeleted = true;
            }

            return Task.FromResult(entity);
        }

        public async Task<int> DeleteByIdAsync(int id)
        {
            TEntity? exist = await _context.FindAsync<TEntity>(id);
            if(exist != null)
            {
                /*_context.Remove(exist);*/
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
            return await _context.Set<TEntity>().FindAsync(id);
        }

        public async Task<TEntity> UpdateAsync(TEntity entity)
        {
            TEntity exist = await _context.Set<TEntity>().FindAsync(entity.Id);
            if(exist != null)
            {
                _context.Entry(exist).CurrentValues.SetValues(entity);
            }

            return entity;
        }
    }
}