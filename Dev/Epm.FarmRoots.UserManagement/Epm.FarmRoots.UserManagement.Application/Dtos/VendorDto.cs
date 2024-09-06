using System.ComponentModel.DataAnnotations;
namespace Epm.FarmRoots.UserManagement.Application.Dtos
{
    public class VendorDto
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string Name { get; set; }

        [Required]
        public required string Email { get; set; }

        [Required]
        public required string PhoneNumber { get; set; }

        [Required]
        public required string Password { get; set; }
    }
}
