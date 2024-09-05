using Epm.FarmRoots.UserManagement.Application.Dtos;

namespace Epm.FarmRoots.UserManagement.Application.Interfaces
{
    public interface ICustomerService
    {
        Task<CustomerDto> RegisterCustomerAsync(CustomerDto customerDto);
        Task<List<CustomerDto>> GetAllCustomersAsync();
        Task<bool> EmailExistsAsync(string email);
    }
}
