using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Epm.FarmRoots.IdentityService;

namespace Epm.FarmRoots.UserManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerLoginController : ControllerBase
    {
        private readonly ICustomerLoginService _customerLoginService;
        private readonly TokenService _tokenService; 

        public CustomerLoginController(ICustomerLoginService customerLoginService, TokenService tokenService)
        {
            _customerLoginService = customerLoginService;
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
                var customer = await _customerLoginService.LoginCustomerAsync(loginDto.Email, loginDto.Password);
                if (customer == null)
                {
                    return Unauthorized("Invalid email or password.");
                }

                var customerId = customer.Id;
                var token = _tokenService.GenerateToken(customer.Email, "Customer");
                return Ok(new { token, customerId });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
        }
    }
}
