#pragma warning disable
using Epm.FarmRoots.UserManagement.Core.Entities;
using Epm.FarmRoots.UserManagement.Core.Interfaces;
using Epm.FarmRoots.UserManagement.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Epm.FarmRoots.UserManagement.Infrastructure.Repositories
{
    public class VendorRepository : IVendorRepository
    {
        private readonly ApplicationDbContext _context;

        public VendorRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Vendor> RegisterVendorAsync(Vendor vendor)
        {
            var existingVendor = await _context.VendorDb.FirstOrDefaultAsync(v => v.Email == vendor.Email);
            if (existingVendor != null)
            {
                throw new InvalidOperationException("An account with this email already exists.");
            }

            _context.VendorDb.Add(vendor);
            await _context.SaveChangesAsync();

            return vendor;
        }

        public async Task<Vendor> DeleteVendorAsync(int id)
        {
            var vendor = await _context.VendorDb.FirstOrDefaultAsync(v => v.Id == id);
            if (vendor == null)
            {
                throw new InvalidOperationException("Vendor not found.");
            }

            _context.VendorDb.Remove(vendor);
            await _context.SaveChangesAsync();
            return vendor;
        }

        public async Task<Vendor> UpdateVendorDetailsAsync(Vendor vendor)
        {
            var existingVendor = await _context.VendorDb.FirstOrDefaultAsync(v => v.Id == vendor.Id);
            if (existingVendor == null)
            {
                throw new InvalidOperationException("Vendor not found.");
            }

            existingVendor.Name = vendor.Name;
            existingVendor.Email = vendor.Email;
            await _context.SaveChangesAsync();

            return existingVendor;
        }

        public async Task<Vendor> GetVendorByIdAsync(int id)
        {
            return await _context.VendorDb.FirstOrDefaultAsync(v => v.Id == id);
        }

        public async Task<Vendor> LoginVendorAsync(string email, string password)
        {
            var vendor = await _context.VendorDb.FirstOrDefaultAsync(v => v.Email == email && v.Password == password);

            if (vendor == null)
            {
                throw new UnauthorizedAccessException("Invalid credentials.");
            }

            return vendor;
        }

        public async Task<Vendor> GetVendorByEmailAsync(string email)
        {
            return await _context.VendorDb.FirstOrDefaultAsync(v => v.Email == email);
        }



    }
}
