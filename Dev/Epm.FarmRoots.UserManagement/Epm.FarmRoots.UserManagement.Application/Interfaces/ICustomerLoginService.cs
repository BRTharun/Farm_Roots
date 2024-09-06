using Epm.FarmRoots.UserManagement.Application.Dtos;

namespace Epm.FarmRoots.UserManagement.Application.Interfaces
{
    public interface ICustomerLoginService
    {
        Task<LoginResponseDto> LoginCustomerAsync(string email, string password);
    }
}