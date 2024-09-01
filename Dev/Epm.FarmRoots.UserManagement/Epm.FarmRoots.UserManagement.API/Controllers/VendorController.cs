#pragma warning disable
using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Epm.FarmRoots.UserManagement.Application.Services;
using Epm.FarmRoots.UserManagement.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

            await _vendorService.RegisterVendorAsync(vendorDto);
            return Ok(vendorDto);
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<VendorDto>> GetVendorById(int id)
        {
            try
            {
                var vendorDto = await _vendorService.GetVendorByIdAsync(id);
                return Ok(vendorDto);
            }
            catch (KeyNotFoundException knfException)
            {
                return NotFound(knfException.Message);
            }
            catch (Exception ex)
            {
                // log the exception details
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }


        }
    }
}
