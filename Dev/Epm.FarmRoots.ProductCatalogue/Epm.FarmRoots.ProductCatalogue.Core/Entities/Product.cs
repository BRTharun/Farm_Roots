namespace Epm.FarmRoots.ProductCatalogue.Core.Entities
{
    public class Product
    {
        public int ProductId { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public DateTime? UpdatedOn { get; set; } = DateTime.Now;
        public string Url { get; set; }

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

        //ForeignKey Properties
        public int PriceId { get; set; }
        public int InventoryId { get; set; }
        public int CategoryId { get; set; }
        public int ImagesId { get; set; }
        public int ManufacturerId { get; set; }


        //Navigation Properties
        public Price Price { get; set; }

        public Inventory Inventory { get; set; }
        public Images Images { get; set; }
        public Category Category { get; set; }
        public Manufacturer Manufacturer { get; set; }
    }

}
