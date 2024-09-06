
using Epm.FarmRoots.UserManagement.Core.Entities;
namespace Epm.FarmRoots.UserManagement.Core.Interfaces
{
    public interface ICustomerRepository
    {
        Task<Customer> RegisterCustomerAsync(Customer customer);
        Task<List<Customer>> GetAllCustomersAsync();
<       Task<bool> EmailExistsAsync(string email);
        Task<Customer> LoginCustomerAsync(string email, string password);
        Task<Customer> GetCustomerByEmailAsync(string email);
    }
}
