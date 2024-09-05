using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace Epm.FarmRoots.UserManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;
        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> CustomerRegister([FromBody] CustomerDto customerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (!Regex.IsMatch(customerDto.PhoneNumber, @"^\d{10}$"))
            {
                return BadRequest("Invalid phone number");
            }

            bool emailExists = await _customerService.EmailExistsAsync(customerDto.Email);
            if (emailExists)
            {
                return BadRequest("Email already exists");
            }

            customerDto.Password = HashPassword(customerDto.Password);
            var registeredCustomer = await _customerService.RegisterCustomerAsync(customerDto);
            return Ok(registeredCustomer);
        }

        [HttpGet]
        [Route("GetCustomers")]
        public async Task<ActionResult<List<CustomerDto>>> GetCustomers()
        {
            try
            {
                var customerDto = await _customerService.GetAllCustomersAsync();
                return Ok(customerDto);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        private string HashPassword(object password)
        {
            var hasher = new PasswordHasher<IdentityUser>();
            return hasher.HashPassword(null, password.ToString());
        }
    }
}
