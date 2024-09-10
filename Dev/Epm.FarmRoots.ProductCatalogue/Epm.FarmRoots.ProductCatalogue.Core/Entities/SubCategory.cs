namespace Epm.FarmRoots.ProductCatalogue.Core.Entities
{
    public class SubCategory
    {
        public int SubCategoryId { get; set; }
        public required string SubCategoryName { get; set; }
        public int CategoryId { get; set; }
        public byte[]? ImageUrl { get; set; }
        public Category Category { get; set; }
    }
}
