namespace Epm.FarmRoots.ProductCatalogue.Application.Dtos
{
    public class SubCategoryDto
    {
        public int SubCategoryId { get; set; }
        public string SubCategoryName { get; set; }
        public int CategoryId { get; set; }
        public byte[]? ImageUrl { get; set; }
        public CategoryDto Category { get; set; }
    }
}
