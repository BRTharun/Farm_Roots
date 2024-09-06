using AutoMapper;
using Epm.FarmRoots.IdentityService;
using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Epm.FarmRoots.UserManagement.Core.Interfaces;

public class CustomerLoginService : ICustomerLoginService
{
    private readonly ICustomerRepository _customerRepository;
    private readonly IMapper _mapper;
    private readonly TokenService _tokenService;

    public CustomerLoginService(ICustomerRepository customerRepository, IMapper mapper, TokenService tokenService)
    {
        _customerRepository = customerRepository;
        _mapper = mapper;
        _tokenService = tokenService;
    }

    public async Task<LoginResponseDto> LoginCustomerAsync(string email, string password)
    {
        var customer = await _customerRepository.GetCustomerByEmailAsync(email);

        if (customer == null || customer.Password != password)
        {
            throw new UnauthorizedAccessException("Invalid email or password.");
        }

        var token = _tokenService.GenerateToken(customer.Email, "Customer");

        return new LoginResponseDto
        {
            Email = customer.Email,
            Token = token
        };
    }
}