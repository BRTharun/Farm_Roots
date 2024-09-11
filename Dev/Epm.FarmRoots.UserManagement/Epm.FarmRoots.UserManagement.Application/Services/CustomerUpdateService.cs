using AutoMapper;
using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Epm.FarmRoots.UserManagement.Core.Interfaces;
namespace Epm.FarmRoots.UserManagement.Application.Services
{
    public class CustomerUpdateService : ICustomerUpdateService
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IMapper _mapper;
        public CustomerUpdateService(ICustomerRepository customerRepository, IMapper mapper)
        {
            _customerRepository = customerRepository;
            _mapper = mapper;
        }

        public async Task<CustomerUpdateResponseDto> UpdateCustomerDetailsAsync(int customerId, CustomerUpdateDto customerDto)
        {
            var customer = await _customerRepository.GetCustomerByIdAsync(customerId);

            if (customer == null)
            {
                throw new KeyNotFoundException("Customer not found.");
            }
            customer.Name = customerDto.Name;
            customer.Email = customerDto.Email;
            customer.PhoneNumber = customerDto.PhoneNumber;

            await _customerRepository.UpdateCustomerAsync(customer);
            return _mapper.Map<CustomerUpdateResponseDto>(customer);
        }
    }
}
