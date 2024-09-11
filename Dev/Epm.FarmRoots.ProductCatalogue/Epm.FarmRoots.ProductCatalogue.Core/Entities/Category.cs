namespace Epm.FarmRoots.ProductCatalogue.Core.Entities
{
    public class Category
    {
        public int CategoryId { get; set; }
        public required string CategoryName { get; set; }
        public byte[]? ImageUrl { get; set; }
        public ICollection<SubCategory> SubCategories { get; set; } = new List<SubCategory>();

    }
}
