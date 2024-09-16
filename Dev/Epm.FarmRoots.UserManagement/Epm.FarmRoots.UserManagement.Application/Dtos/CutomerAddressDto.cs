using Epm.FarmRoots.UserManagement.Core.Entities;
using System.ComponentModel.DataAnnotations;
namespace Epm.FarmRoots.UserManagement.Application.Dtos
{
    public class CustomerAddressDto
    {
        [Key]
        public int CustomerAddressId { get; set; }

        [Required(ErrorMessage = "House Number and Floor are required.")]
        public required string HouseNoAndFloor { get; set; }

        [Required(ErrorMessage = "Building and Block Number are required.")]
        public required string BuildingAndBlockNo { get; set; }

        [Required(ErrorMessage = "Pincode is required.")]
        [RegularExpression(@"^[1-9][0-9]{2}(?:[ 0-9]{3})?$", ErrorMessage = "Invalid Pincode format.")]
        public required string Pincode { get; set; }

        public string LandmarkAndAreaName { get; set; }

        public required int CustomerId { get; set; }
    }
}
