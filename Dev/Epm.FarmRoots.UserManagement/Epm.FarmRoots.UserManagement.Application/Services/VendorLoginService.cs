using AutoMapper;
using Epm.FarmRoots.IdentityService;
using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Epm.FarmRoots.UserManagement.Core.Entities;
using Epm.FarmRoots.UserManagement.Core.Interfaces;
using System;
using System.Threading.Tasks;

public class VendorLoginService : IVendorLoginService
{
    private readonly IVendorRepository _vendorRepository;
    private readonly IMapper _mapper;
    private readonly TokenService _tokenService;

    public VendorLoginService(IVendorRepository vendorRepository, IMapper mapper, TokenService tokenService)
    {
        _vendorRepository = vendorRepository;
        _mapper = mapper;
        _tokenService = tokenService;
    }

    public async Task<LoginResponseDto> LoginVendorAsync(string email, string password)
    {
        var vendor = await _vendorRepository.GetVendorByEmailAsync(email);

        if (vendor == null || vendor.Password != password)
        {
            throw new UnauthorizedAccessException("Invalid email or password.");
        }

        var token = _tokenService.GenerateToken(vendor.Email, "Vendor");

        return new LoginResponseDto
        {
            Email = vendor.Email,
            Token = token
        };
    }
}
