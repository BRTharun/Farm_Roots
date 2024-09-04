#pragma warning disable
using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Epm.FarmRoots.UserManagement.Application.Services;
using Epm.FarmRoots.UserManagement.Core.Entities;
using Microsoft.AspNetCore.Http;
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

        public VendorController(IVendorService vendorService)
        {
            _vendorService = vendorService;
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

        private string HashPassword(object password)
        {
            var hasher = new PasswordHasher<IdentityUser>();
            return hasher.HashPassword(null, password.ToString());
        }
    }
}
