using AutoMapper;
using Epm.FarmRoots.IdentityService;
using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Epm.FarmRoots.UserManagement.Core.Entities;
using Epm.FarmRoots.UserManagement.Core.Interfaces;
using Microsoft.AspNetCore.Identity;

public class CustomerLoginService : ICustomerLoginService
{
    private readonly ICustomerRepository _customerRepository;
    private readonly IMapper _mapper;
    private readonly TokenService _tokenService;
    private readonly IPasswordHasher<Customer> _passwordHasher;

    public CustomerLoginService(ICustomerRepository customerRepository, IMapper mapper, TokenService tokenService, IPasswordHasher<Customer> passwordHasher)
    {
        _customerRepository = customerRepository;
        _mapper = mapper;
        _tokenService = tokenService;
        _passwordHasher = passwordHasher;
    }

    public async Task<LoginResponseDto> LoginCustomerAsync(string email, string password)
    {
        var customer = await _customerRepository.GetCustomerByEmailAsync(email);

        if (customer == null)
        {
            throw new UnauthorizedAccessException("Invalid email or password.");
        }
        var arePasswordsEqual = _passwordHasher.VerifyHashedPassword(customer,customer.Password, password);

        if (arePasswordsEqual != PasswordVerificationResult.Success)
        {
            throw new UnauthorizedAccessException("Invalid email or password.");
        }

        var token = _tokenService.GenerateToken(customer.Email, "Customer");


        return new LoginResponseDto
        {
            Email = customer.Email,
            Token = token,
            Id = customer.CustomerId
        };
    }

}