using System.ComponentModel.DataAnnotations;
namespace Epm.FarmRoots.UserManagement.Application.Dtos
{
    public class CustomerDto
    {
        [Key]
        public int CustomerId { get; set; }

        [Required]
        [StringLength(20, ErrorMessage = "Name cannot be longer than 20 characters.")]
        public required string Name { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Email cannot be longer than 50 characters.")]
        public required string Email { get; set; }

        [Required]
        [StringLength(10, ErrorMessage = "Phone number must be exactly 10 digits.")]
        public required string PhoneNumber { get; set; }
        [Required]
        public required string Password { get; set; }
    }
}
