using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Epm.FarmRoots.UserManagement.Application.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace Epm.FarmRoots.UserManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendorController : ControllerBase
    {
        private readonly IVendorService _vendorService;
        private readonly IVendorAddressService _vendorAddressService;

        public VendorController(IVendorService vendorService, IVendorAddressService vendorAddressService)
        {
            _vendorService = vendorService;
            _vendorAddressService = vendorAddressService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> VendorRegister([FromBody] VendorDto vendorDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (!Regex.IsMatch(vendorDto.PhoneNumber, @"^\d{10}$"))
            {
                return BadRequest("Invalid phone number");
            }
            bool emailExists = await _vendorService.EmailExistsAsync(vendorDto.Email);
            if (emailExists)
            {
                return BadRequest("Email already exists");
            }
            vendorDto.Password = HashPassword(vendorDto.Password);
            await _vendorService.RegisterVendorAsync(vendorDto);
            return Ok(vendorDto);
        }


        [HttpPost("vendors/{vendorId}/AddAddresses")]
        public async Task<IActionResult> AddAddress(int vendorId, [FromBody] VendorAddressDto addressDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _vendorAddressService.AddVendorAddressAsync(vendorId, addressDto);
            return Ok(addressDto);
        }

        [HttpPut("{vendorId}/addresses/{addressId}")]
        public async Task<IActionResult> UpdateAddress(int vendorId, int addressId, [FromBody] VendorAddressDto addressDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            addressDto.VendorAddressId = addressId;
            addressDto.VendorId = vendorId;

            try
            {
                await _vendorAddressService.UpdateVendorAddressAsync(addressDto);
                return Ok(addressDto);
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


        [HttpGet("{vendorId}/GetAddresses")]
        public async Task<IActionResult> GetAddressesByVendorIdAsync(int vendorId)
        {
            var addresses = await _vendorAddressService.GetAddressesByVendorIdAsync(vendorId);
            if (addresses == null || addresses.Count == 0)
            {
                return NotFound($"No addresses found for Vendor ID {vendorId}.");
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
