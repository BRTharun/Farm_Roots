using Epm.FarmRoots.UserManagement.Application.Dtos;

namespace Epm.FarmRoots.UserManagement.Application.Interfaces
{
    public interface IVendorLoginService
    {
        Task<LoginResponseDto> LoginVendorAsync(string email, string password);
    }
}