namespace Epm.FarmRoots.ProductCatalogue.Core.Entities
{
    public class Product
    {
        public int ProductId { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Today;
        public DateTime UpdatedOn { get; set; } = DateTime.Today;

        public string ProductType { get; set; } = "Simple Product";

        //public required bool Published { get; set; }

        public required string ProductName { get; set; }
        public required string ProductDescription { get; set; }
        public required string ProductCategory { get; set; }
        public required int ProductStock { get; set; }
        public required decimal ProductMrp { get; set; }
        public required decimal ProductSale_Price { get; set; }
        public required byte[] ProductImage { get; set; }

        public string ShortDescription { get; set; }
        public string? FullDescription { get; set; }
        public string ProductCondition { get; set; } = "New";
        public string CountryOfOrigin { get; set; } = "Not specified";
        public List<string> ProductTags { get; set; } = new List<string>();

        public int VendorId { get; set; }
        public int CategoryId { get; set; } = 1;
        public Price Price { get; set; }
        public Images Images { get; set; }
        public Inventory Inventory { get; set; }
        public Manufacturer Manufacturer { get; set; }
    }
}
