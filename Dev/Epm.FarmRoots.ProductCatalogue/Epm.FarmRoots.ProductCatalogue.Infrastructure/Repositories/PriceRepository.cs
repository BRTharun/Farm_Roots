using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Epm.FarmRoots.ProductCatalogue.Core.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Repositories
{
    public class PriceRepository : IPriceRepository
    {
        private readonly PriceDbContext _context;

        public PriceRepository(PriceDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Price>> GetAllAsync()
        {
            return await _context.Prices.ToListAsync();
        }

        public async Task<Price> GetByIdAsync(int id)
        {
            return await _context.Prices.FindAsync(id);
        }

        public async Task AddAsync(Price price)
        {
            _context.Prices.Add(price);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Price price)
        {
            _context.Prices.Update(price);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Price price)
        {
            _context.Prices.Remove(price);
            await _context.SaveChangesAsync();
        }
    }
}