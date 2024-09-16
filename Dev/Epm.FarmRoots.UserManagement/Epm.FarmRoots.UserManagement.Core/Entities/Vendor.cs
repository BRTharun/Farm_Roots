using System.ComponentModel.DataAnnotations;
namespace Epm.FarmRoots.UserManagement.Core.Entities
{
    public class Vendor 
    {
        [Key]
        public int VendorId { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string PhoneNumber { get; set; }
        public required string Password { get; set; }
        public List<VendorAddress> VendorAddresses { get; set; } = new List<VendorAddress>();
    }
}
