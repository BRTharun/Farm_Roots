using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Epm.FarmRoots.UserManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerLoginController : ControllerBase
    {
        private readonly ICustomerLoginService _customerLoginService;

        public CustomerLoginController(ICustomerLoginService customerLoginService)
        {
            _customerLoginService = customerLoginService;
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
                var loginResponse = await _customerLoginService.LoginCustomerAsync(loginDto.Email, loginDto.Password);
                return Ok(loginResponse);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
        }
    }
}