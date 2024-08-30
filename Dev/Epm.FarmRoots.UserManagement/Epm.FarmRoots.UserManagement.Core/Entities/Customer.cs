using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.UserManagement.Core.Entities
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }


        [Required(ErrorMessage = "Name is required.")]
        [StringLength(20, ErrorMessage = "Name cannot be longer than 20 characters.")]
        [RegularExpression(@"^[a-zA-Z\s]+$", ErrorMessage = "Name can only contain letters and spaces.")]
        public string Name { get; set; }


        [Required(ErrorMessage = "Email is required.")]
        [RegularExpression(@"^[^\s@]+@[^\s@]+\.[^\s@]+$", ErrorMessage = "Invalid email address format.")]
        [StringLength(20, ErrorMessage = "Email cannot be longer than 20 characters.")]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "Phone number is required.")]
        [RegularExpression(@"^[6789]\d{9}$", ErrorMessage = "Phone number must start with 6, 7, 8, or 9 and be exactly 10 digits.")]
        [StringLength(10, ErrorMessage = "Phone number must be exactly 10 digits.")]
        public string PhoneNumber { get; set; }


        [Required(ErrorMessage = "Password is required.")]
        [StringLength(24, MinimumLength = 8, ErrorMessage = "Password must be between 8 and 24 characters.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }



        [Required(ErrorMessage = "Please confirm your password.")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
}
