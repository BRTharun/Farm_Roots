using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Epm.FarmRoots.UserManagement.Core.Entities;
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
        private readonly ICustomerUpdateService _customerUpdateService;
        public CustomerController(ICustomerService customerService, ICustomerUpdateService customerUpdateService)
        {
            _customerService = customerService;
            _customerUpdateService = customerUpdateService;
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



        [HttpPut("UpdateCustomer/{customerId}")]
        public async Task<IActionResult> UpdateCustomer(int customerId, [FromBody] CustomerUpdateDto customerDto)
        {
            try
            {
                var updatedCustomerDto = await _customerUpdateService.UpdateCustomerDetailsAsync(customerId, customerDto);
                return Ok(updatedCustomerDto);
            }
            catch (KeyNotFoundException knfe)
            {
                return NotFound(knfe.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while updating the customer." + ex.Message);
            }
        }


        [HttpPut("ChangePassword/{customerId}")]
        public async Task<IActionResult> ChangePassword(int customerId, [FromBody] ChangePasswordModel passwordModel)
        {
            if (string.IsNullOrWhiteSpace(passwordModel.NewPassword))
            {
                return BadRequest("New password must not be empty.");
            }

            try
            {
                CustomerDto updatedCustomer = await _customerService.ChangePasswordAsync(customerId, passwordModel.OldPassword, passwordModel.NewPassword);
                return Ok(updatedCustomer);
            }
            catch (KeyNotFoundException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while updating the password." + ex.Message);
            }
        }


        private string HashPassword(object password)
        {
            var hasher = new PasswordHasher<IdentityUser>();
            return hasher.HashPassword(null, password.ToString());
        }
    }
}
