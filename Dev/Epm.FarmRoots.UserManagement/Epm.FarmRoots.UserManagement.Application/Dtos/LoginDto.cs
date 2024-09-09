﻿using System.ComponentModel.DataAnnotations;

namespace Epm.FarmRoots.UserManagement.Application.Dtos
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; }

    }
}