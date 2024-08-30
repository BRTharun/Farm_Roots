using Epm.FarmRoots.UserManagement.Core.Entities;
using Epm.FarmRoots.UserManagement.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.UserManagement.Application.Services
{
    public class VendorRegisterService
    {
        private readonly ApplicationDbContext _context;

        public VendorRegisterService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task RegisterVendorAsync(Vendor vendor)
        {
            _context.VendorDb.Add(vendor);
            await _context.SaveChangesAsync();
        }
    }
}
