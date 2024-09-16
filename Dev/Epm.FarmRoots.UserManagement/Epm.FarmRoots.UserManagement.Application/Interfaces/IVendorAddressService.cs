using Epm.FarmRoots.UserManagement.Application.Dtos;
namespace Epm.FarmRoots.UserManagement.Application.Interfaces
{
    public interface IVendorAddressService
    {
        Task<List<VendorAddressDto>> GetAddressesByVendorIdAsync(int vendorId);
        Task AddVendorAddressAsync(int vendorId, VendorAddressDto addressDto);
        Task UpdateVendorAddressAsync(VendorAddressDto addressDto);
    }
}
