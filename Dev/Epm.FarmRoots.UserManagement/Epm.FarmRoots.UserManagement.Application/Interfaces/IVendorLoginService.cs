using Epm.FarmRoots.UserManagement.Application.Dtos;
using System.Threading.Tasks;

namespace Epm.FarmRoots.UserManagement.Application.Interfaces
{
    public interface IVendorLoginService
    {
        Task<LoginResponseDto> LoginVendorAsync(string email, string password);
    }
}