using Epm.FarmRoots.UserManagement.Core.Entities;
using Epm.FarmRoots.UserManagement.Core.Interfaces;
using Epm.FarmRoots.UserManagement.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
namespace Epm.FarmRoots.UserManagement.Infrastructure.Repositories
{
    public class VendorAddressRepository : IVendorAddressRepository
    {
        private readonly ApplicationDbContext _context;

        public VendorAddressRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<VendorAddress>> GetAddressesByVendorIdAsync(int vendorId)
        {
            return await _context.VendorAddressDb.Where(v => v.VendorId == vendorId).ToListAsync();
        }

        public async Task AddAddressAsync(VendorAddress address)
        {
            _context.VendorAddressDb.Add(address);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAddressAsync(VendorAddress address)
        {
            _context.VendorAddressDb.Update(address);
            await _context.SaveChangesAsync();
        }

        public async Task<VendorAddress> GetAddressByIdAsync(int vendorAddressId)
        {
            return await _context.VendorAddressDb.FirstOrDefaultAsync(v => v.VendorAddressId == vendorAddressId);
        }
    }
}
