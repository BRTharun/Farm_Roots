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
        Task<Vendor> UpdateVendorDetailsAsync(Vendor customer);
        Task<Vendor> DeleteVendorAsync(int id);
        Task<Vendor> GetVendorByIdAsync(int id);
        Task<Vendor> LoginVendorAsync(string email, string password);
        Task<Vendor> GetVendorByEmailAsync(string email);
    }
}
