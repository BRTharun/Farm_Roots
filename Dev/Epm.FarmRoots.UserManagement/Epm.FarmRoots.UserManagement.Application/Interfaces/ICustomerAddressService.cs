using Epm.FarmRoots.UserManagement.Application.Dtos;
namespace Epm.FarmRoots.UserManagement.Application.Interfaces
{
    public interface ICustomerAddressService
    {
        Task<List<CustomerAddressDto>> GetAddressesByCustomerIdAsync(int customerId);
        Task AddCustomerAddressAsync(int customerId, CustomerAddressDto addressDto);
        Task UpdateCustomerAddressAsync(CustomerAddressDto addressDto);
    }
}
