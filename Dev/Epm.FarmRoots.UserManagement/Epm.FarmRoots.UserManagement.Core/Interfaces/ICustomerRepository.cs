#pragma warning disable
using Epm.FarmRoots.UserManagement.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.UserManagement.Core.Interfaces
{
    public interface ICustomerRepository
    {
        Task<Customer> RegisterCustomerAsync(Customer customer);
        Task<Customer> UpdateCustomerDetailsAsync(Customer customer);
        Task<Customer> DeleteCustomerAsync(int id);
        Task<List<Customer>> GetAllCustomersAsync();
        Task<Customer> LoginCustomerAsync(string email, string password);
        Task<Customer> GetCustomerByEmailAsync(string email);
    }
}
