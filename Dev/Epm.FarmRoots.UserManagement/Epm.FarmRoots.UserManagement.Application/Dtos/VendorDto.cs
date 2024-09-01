#pragma warning disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.UserManagement.Application.Dtos
{
    public class VendorDto
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(20, ErrorMessage = "Name cannot be longer than 20 characters.")]
        public string Name { get; set; }


        [Required]
        [StringLength(50, ErrorMessage = "Email cannot be longer than 50 characters.")]
        public string Email { get; set; }

        [Required]
        [StringLength(10, ErrorMessage = "Phone number must be exactly 10 digits.")]
        public string PhoneNumber { get; set; }


        [Required]
        [StringLength(24, MinimumLength = 8, ErrorMessage = "Password must be between 8 and 24 characters.")]
        public string Password { get; set; }



        [Required]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

    }
}
