using Epm.FarmRoots.UserManagement.Core.Entities;
namespace Epm.FarmRoots.UserManagement.Core.Interfaces
{
    public interface IVendorAddressRepository
    {
        Task<List<VendorAddress>> GetAddressesByVendorIdAsync(int vendorId);
        Task AddAddressAsync(VendorAddress address);
        Task UpdateAddressAsync(VendorAddress address);
        Task<VendorAddress> GetAddressByIdAsync(int vendorAddressId);
    }
}
