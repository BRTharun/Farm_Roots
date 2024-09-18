
using Epm.FarmRoots.UserManagement.Core.Entities;
namespace Epm.FarmRoots.UserManagement.Core.Interfaces
{
    public interface IVendorRepository
    {
        Task<Vendor> RegisterVendorAsync(Vendor customer);
        Task<Vendor?> GetVendorByIdAsync(int id);
        Task<bool> EmailExistsAsync(string email);
        Task<Vendor> LoginVendorAsync(string email, string password);
        Task<Vendor?> GetVendorByEmailAsync(string email);
        Task UpdateVendorAsync(Vendor vendor);//

    }
}
