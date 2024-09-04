#pragma warning disable
using Epm.FarmRoots.UserManagement.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.UserManagement.Core.Interfaces
{
    public interface IVendorRepository
    {
        Task<Vendor> RegisterVendorAsync(Vendor customer);
        Task<Vendor> GetVendorByIdAsync(int id);
        Task<bool> EmailExistsAsync(string email);
    }
}
