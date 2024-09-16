using Epm.FarmRoots.UserManagement.Core.Entities;
namespace Epm.FarmRoots.UserManagement.Core.Interfaces
{
    public interface ICustomerAddressRepository
    {
        Task<List<CustomerAddress>> GetAddressesByCustomerIdAsync(int customerId);
        Task AddAddressAsync(CustomerAddress address);
        Task UpdateAddressAsync(CustomerAddress address);
        Task<CustomerAddress> GetAddressByIdAsync(int addressId);
    }
}
