using Epm.FarmRoots.UserManagement.Core.Entities;
using Epm.FarmRoots.UserManagement.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.UserManagement.Application.Services
{
    public class CustomerRegisterService
    {
        private readonly ApplicationDbContext _context;

        public CustomerRegisterService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task RegisterCustomerAsync(Customer customer)
        {
            _context.CustomerDb.Add(customer);
            await _context.SaveChangesAsync();
        }
    }
}
