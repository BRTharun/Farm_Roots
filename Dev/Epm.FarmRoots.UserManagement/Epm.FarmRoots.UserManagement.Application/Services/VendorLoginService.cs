using AutoMapper;
using Epm.FarmRoots.IdentityService;
using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Epm.FarmRoots.UserManagement.Core.Entities;
using Epm.FarmRoots.UserManagement.Core.Interfaces;
using Microsoft.AspNetCore.Identity;

public class VendorLoginService : IVendorLoginService
{
    private readonly IVendorRepository _vendorRepository;
    private readonly IMapper _mapper;
    private readonly TokenService _tokenService;
    private readonly IPasswordHasher<Vendor> _passwordHasher;

    public VendorLoginService(IVendorRepository vendorRepository, IMapper mapper, TokenService tokenService, IPasswordHasher<Vendor> passwordHasher)
    {
        _vendorRepository = vendorRepository;
        _mapper = mapper;
        _tokenService = tokenService;
        _passwordHasher = passwordHasher;
    }

    public async Task<LoginResponseDto> LoginVendorAsync(string email, string password)
    {
        var vendor = await _vendorRepository.GetVendorByEmailAsync(email);

        if (vendor == null)
        {
            throw new UnauthorizedAccessException("Invalid email or password.");
        }
        var arePasswordsEqual = _passwordHasher.VerifyHashedPassword(vendor, vendor.Password, password);


        if (arePasswordsEqual != PasswordVerificationResult.Success)
        {
            throw new UnauthorizedAccessException("Invalid email or password.");
        }

        var token = _tokenService.GenerateToken(vendor.Email, "Vendor");

        return new LoginResponseDto
        {
            Email = vendor.Email,
            Token = token,
            Id = vendor.Id
        };
    }
}
