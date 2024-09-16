using System.ComponentModel.DataAnnotations;

namespace Epm.FarmRoots.UserManagement.Core.Entities
{
    public class CustomerAddress
    {
        [Key]
        public int CustomerAddressId { get; set; }
        public required string HouseNoAndFloor { get; set; }
        public required string BuildingAndBlockNo { get; set; }
        public required string Pincode { get; set; }
        public string LandmarkAndAreaName { get; set; }
        public required int CustomerId { get; set; }
        public Customer Customer { get; set; }
    }
}
