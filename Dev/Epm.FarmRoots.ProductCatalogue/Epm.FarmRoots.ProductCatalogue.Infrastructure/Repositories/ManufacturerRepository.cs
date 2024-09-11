using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Epm.FarmRoots.ProductCatalogue.Core.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Repositories
{
    public class ManufacturerRepository : IManufacturerRepository
    {
        private readonly ManufacturerDbContext _context;

        public ManufacturerRepository(ManufacturerDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Manufacturer>> GetAllAsync()
        {
            return await _context.Set<Manufacturer>().ToListAsync();
        }

        public async Task<Manufacturer> GetByIdAsync(int id)
        {
            return await _context.Set<Manufacturer>().FindAsync(id);
        }

        public async Task AddAsync(Manufacturer manufacture)
        {
            await _context.Set<Manufacturer>().AddAsync(manufacture);
            await _context.SaveChangesAsync();
        }

        public IQueryable<Manufacturer> Manufacturers => _context.Manufacturers;
    }
}
