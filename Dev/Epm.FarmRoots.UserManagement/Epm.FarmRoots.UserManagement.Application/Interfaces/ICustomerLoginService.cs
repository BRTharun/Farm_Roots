using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Core.Entities;

namespace Epm.FarmRoots.UserManagement.Application.Interfaces
{
    public interface ICustomerLoginService
    {
        Task<LoginResponseDto> LoginCustomerAsync(string email, string password);
    }
}