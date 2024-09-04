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
        Task<List<Customer>> GetAllCustomersAsync();
<       Task<bool> EmailExistsAsync(string email);
    }
}
