﻿using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Epm.FarmRoots.IdentityService;
using Epm.FarmRoots.UserManagement.Core.Entities;

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

                return Ok(new
                {
                    customer.Token,
                    customer.Id,
                    role = "customer" // Adding role attribute
                });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
        }
    }
}