using Epm.FarmRoots.UserManagement.Application.Dtos;
using System.Threading.Tasks;

namespace Epm.FarmRoots.UserManagement.Application.Interfaces
{
    public interface ICustomerLoginService
    {
        Task<LoginResponseDto> LoginCustomerAsync(string email, string password);
    }
}