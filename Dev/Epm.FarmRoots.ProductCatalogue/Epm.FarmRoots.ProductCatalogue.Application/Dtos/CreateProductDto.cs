using Epm.FarmRoots.ProductCatalogue.Core.Entities;

namespace Epm.FarmRoots.ProductCatalogue.Application.Dtos
{
    public class CreateProductDto
    {
        public string ProductType { get; set; } = "Simple Product";
        public required bool Published { get; set; }
        public required string ProductName { get; set; }
        public required string ShortDescription { get; set; }
        public string? FullDescription { get; set; }
        public string ProductCondition { get; set; } = "New";
        public List<string>? ProductTags { get; set; } = new List<string>();
        public int VendorId { get; set; }
    }
}