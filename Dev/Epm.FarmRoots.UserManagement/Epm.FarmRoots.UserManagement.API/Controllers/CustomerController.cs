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
        private readonly ICustomerAddressService _customerAddressService;
        public CustomerController(ICustomerService customerService, ICustomerUpdateService customerUpdateService, ICustomerAddressService customerAddressService)
        {
            _customerService = customerService;
            _customerUpdateService = customerUpdateService;
            _customerAddressService = customerAddressService;
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
            if (passwordModel == null)
            {
                return BadRequest("The password model must not be null.");
            }
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


        [HttpPost("customers/{customerId}/AddAddresses")]
        public async Task<IActionResult> AddAddress(int customerId, [FromBody] CustomerAddressDto addressDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _customerAddressService.AddCustomerAddressAsync(customerId, addressDto);
            return Ok(new { Success = true, Message = "Address added successfully." });
        }



        [HttpPut("customers/{customerId}/addresses/{addressId}")]
        public async Task<IActionResult> UpdateAddress(int customerId, int addressId, [FromBody] CustomerAddressDto addressDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            addressDto.CustomerAddressId = addressId;
            addressDto.CustomerId = customerId;
            try
            {
                await _customerAddressService.UpdateCustomerAddressAsync(addressDto);
                return Ok(new { Success = true, Message = "Address updated successfully." });
            }
            catch (KeyNotFoundException knfe)
            {
                return NotFound(knfe.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while updating the address.");
            }
        }


        [HttpGet("customers/{customerId}/GetAddresses")]
        public async Task<IActionResult> GetAddressesByCustomerIdAsync(int customerId)
        {
            var addresses = await _customerAddressService.GetAddressesByCustomerIdAsync(customerId);
            if (addresses == null || addresses.Count == 0)
            {
                return NotFound($"No addresses found for Customer ID {customerId}.");
            }

            return Ok(addresses);
        }

        private string HashPassword(object password)
        {
            var hasher = new PasswordHasher<IdentityUser>();
            return hasher.HashPassword(null, password.ToString());
        }
    }
}
