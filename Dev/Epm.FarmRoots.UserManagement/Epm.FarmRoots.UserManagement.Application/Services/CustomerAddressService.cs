using AutoMapper;
using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Epm.FarmRoots.UserManagement.Core.Entities;
using Epm.FarmRoots.UserManagement.Core.Interfaces;
namespace Epm.FarmRoots.UserManagement.Application.Services
{
    public class CustomerAddressService : ICustomerAddressService
    {
        private readonly ICustomerAddressRepository _customerAddressRepository;
        private readonly IMapper _mapper;
        public CustomerAddressService(ICustomerAddressRepository customerAddressRepository, IMapper mapper)
        {
            _customerAddressRepository = customerAddressRepository;
            _mapper = mapper;
        }
        public async Task AddCustomerAddressAsync(int customerId, CustomerAddressDto addressDto)
        {
            var address = _mapper.Map<CustomerAddress>(addressDto);
            address.CustomerId = customerId;
            await _customerAddressRepository.AddAddressAsync(address);
        }

        public async Task<List<CustomerAddressDto>> GetAddressesByCustomerIdAsync(int customerId)
        {
            List<CustomerAddress> addresses = await _customerAddressRepository.GetAddressesByCustomerIdAsync(customerId);

            List<CustomerAddressDto> addressDtos = addresses.Select(address => _mapper.Map<CustomerAddressDto>(address)).ToList();

            return addressDtos;
        }

        public async Task UpdateCustomerAddressAsync(CustomerAddressDto addressDto)
        {
            var existingAddress = await _customerAddressRepository.GetAddressByIdAsync(addressDto.CustomerAddressId); // Assuming such a method exists

            if (existingAddress == null)
            {
                throw new KeyNotFoundException("Specified address not found.");
            }
            _mapper.Map(addressDto, existingAddress);
            await _customerAddressRepository.UpdateAddressAsync(existingAddress);
        }
    }
}
