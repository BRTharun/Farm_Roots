using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Epm.FarmRoots.IdentityService;

namespace Epm.FarmRoots.UserManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendorLoginController : ControllerBase
    {
        private readonly IVendorLoginService _vendorLoginService;
        private readonly TokenService _tokenService; // Ensure this is injected

        public VendorLoginController(IVendorLoginService vendorLoginService, TokenService tokenService)
        {
            _vendorLoginService = vendorLoginService;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var vendor = await _vendorLoginService.LoginVendorAsync(loginDto.Email, loginDto.Password);
                if (vendor == null)
                {
                    return Unauthorized("Invalid email or password.");
                }

                // Generate JWT Token
                var token = _tokenService.GenerateToken(vendor.Email, "Vendor");
                return Ok(new { token });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("Invalid email or password.");
            }
        }
    }
}
