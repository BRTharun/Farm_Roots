using Epm.FarmRoots.UserManagement.Application.Dtos;
namespace Epm.FarmRoots.UserManagement.Application.Interfaces
{
    public interface ICustomerUpdateService
    {
        Task<CustomerUpdateResponseDto> UpdateCustomerDetailsAsync(int customerId, CustomerUpdateDto customerDto);
    }
}
