using Epm.FarmRoots.UserManagement.Application.Dtos;

namespace Epm.FarmRoots.UserManagement.Application.Interfaces
{
    public interface IVendorService
    {
        Task<VendorDto> RegisterVendorAsync(VendorDto vendorDto);
        Task<bool> EmailExistsAsync(string email);
    }
}
