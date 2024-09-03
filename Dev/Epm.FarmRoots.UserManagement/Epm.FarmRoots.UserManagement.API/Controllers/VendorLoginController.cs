using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Epm.FarmRoots.UserManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendorLoginController : ControllerBase
    {
        private readonly IVendorLoginService _vendorLoginService;

        public VendorLoginController(IVendorLoginService vendorLoginService)
        {
            _vendorLoginService = vendorLoginService;
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
                return Ok(vendor);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("Invalid email or password.");
            }
        }
    }
}
