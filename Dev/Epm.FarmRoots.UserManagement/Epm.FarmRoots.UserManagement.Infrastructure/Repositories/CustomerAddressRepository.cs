using Epm.FarmRoots.UserManagement.Core.Entities;
using Epm.FarmRoots.UserManagement.Core.Interfaces;
using Epm.FarmRoots.UserManagement.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Epm.FarmRoots.UserManagement.Infrastructure.Repositories
{
    public class CustomerAddressRepository : ICustomerAddressRepository
    {
        private readonly ApplicationDbContext _context;
        public CustomerAddressRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task AddAddressAsync(CustomerAddress address)
        {
            _context.CustomerAddressDb.Add(address);
            await _context.SaveChangesAsync();
        }

        public async Task<List<CustomerAddress>> GetAddressesByCustomerIdAsync(int customerId)
        {
            return await _context.CustomerAddressDb.Where(a => a.CustomerId == customerId).ToListAsync();
        }

        public async Task UpdateAddressAsync(CustomerAddress address)
        {
            _context.CustomerAddressDb.Update(address);
            await _context.SaveChangesAsync();
        }

        public async Task<CustomerAddress> GetAddressByIdAsync(int addressId)
        {
            return await _context.CustomerAddressDb.FirstOrDefaultAsync(a => a.CustomerAddressId == addressId);
        }
    }
}
