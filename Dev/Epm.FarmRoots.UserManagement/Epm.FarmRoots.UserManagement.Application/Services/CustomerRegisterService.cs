using AutoMapper;
using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Epm.FarmRoots.UserManagement.Core.Entities;
using Epm.FarmRoots.UserManagement.Core.Interfaces;
using Epm.FarmRoots.UserManagement.Core.Utilities;
using Microsoft.AspNetCore.Identity;


namespace Epm.FarmRoots.UserManagement.Application.Services
{
    public class CustomerRegisterService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IMapper _mapper;
        private readonly IPasswordHasher<Customer> _passwordHasher;
        public CustomerRegisterService(ICustomerRepository customerRepository, IMapper mapper, IPasswordHasher<Customer> passwordHasher)
        {
            _customerRepository = customerRepository;
            _mapper = mapper;
            _passwordHasher = passwordHasher;
        }
        public async Task<CustomerDto> RegisterCustomerAsync(CustomerDto customerDto)
        {
            try
            {
                var customer = _mapper.Map<Customer>(customerDto);
                var registeredCustomer = await _customerRepository.RegisterCustomerAsync(customer);
                var registeredCustomerDto = _mapper.Map<CustomerDto>(registeredCustomer);
                return registeredCustomerDto;
            }
            catch(Exception ex)
            {
                throw new Exception("Customer Registration Failed.");
            }
           
           
        }

        public async Task<List<CustomerDto>> GetAllCustomersAsync()
        {
            var customers = await _customerRepository.GetAllCustomersAsync();
            return _mapper.Map<List<CustomerDto>>(customers);
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _customerRepository.EmailExistsAsync(email);
        }


        public async Task<CustomerDto> ChangePasswordAsync(int customerId, string oldPassword, string newPassword)
        {

            var customer = await _customerRepository.GetCustomerByIdAsync(customerId);
            if (customer == null)
            {
                throw new KeyNotFoundException("Customer not found.");
            }
            var verificationResult = _passwordHasher.VerifyHashedPassword(customer, customer.Password, oldPassword);
            if (verificationResult != PasswordVerificationResult.Success)
            {
                throw new ArgumentException("The old password is incorrect.");
            }

            if (!string.IsNullOrWhiteSpace(newPassword))
            {
                customer.Password = _passwordHasher.HashPassword(customer, newPassword);
                await _customerRepository.UpdateCustomerAsync(customer);
            }

            return _mapper.Map<CustomerDto>(customer);
        }

        public async Task<CustomerDto> GetCustomerByIdAsync(int customerId)
        {
            var customer = await _customerRepository.GetCustomerByIdAsync(customerId);
            if (customer == null)
            {
                throw new KeyNotFoundException("Customer not found.");
            }
            return _mapper.Map<CustomerDto>(customer);
        }
    }
}
