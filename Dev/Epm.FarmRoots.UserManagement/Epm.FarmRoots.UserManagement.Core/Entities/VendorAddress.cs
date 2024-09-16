using System.ComponentModel.DataAnnotations;
namespace Epm.FarmRoots.UserManagement.Core.Entities
{
    public class VendorAddress
    {
        [Key]
        public int VendorAddressId { get; set; }
        public required string VendorShopName { get; set; }
        public required string HouseNoAndFloor { get; set; }
        public required string BuildingAndBlockNo { get; set; }
        public required string Pincode { get; set; }
        public string LandmarkAndAreaName { get; set; }
        public required int VendorId { get; set; }
        public Vendor Vendor { get; set; }
    }
}
