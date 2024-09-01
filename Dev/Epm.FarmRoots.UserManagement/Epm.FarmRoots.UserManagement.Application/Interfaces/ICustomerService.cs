#pragma warning disable
using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.UserManagement.Application.Interfaces
{
    public interface ICustomerService
    {
        Task<CustomerDto> RegisterCustomerAsync(CustomerDto customerDto);
        //Task<CustomerDto> UpdateCustomerDetailsAsync(Customer customer);
        //Task<CustomerDto> DeleteCustomerAsync(int id);
        Task<List<CustomerDto>> GetAllCustomersAsync();
    }
}
