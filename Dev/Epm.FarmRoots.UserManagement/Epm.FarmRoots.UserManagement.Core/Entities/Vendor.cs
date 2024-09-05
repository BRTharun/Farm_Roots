using System.ComponentModel.DataAnnotations;
namespace Epm.FarmRoots.UserManagement.Core.Entities
{
    public class Vendor 
    {
        [Key]
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string PhoneNumber { get; set; }
        public required string Password { get; set; }

    }
}
