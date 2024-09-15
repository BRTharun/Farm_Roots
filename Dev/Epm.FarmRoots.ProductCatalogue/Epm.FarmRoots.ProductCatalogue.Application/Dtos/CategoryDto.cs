namespace Epm.FarmRoots.ProductCatalogue.Application.Dtos
{
    public class CategoryDto
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public byte[]? Image { get; set; }
        public ICollection<SubCategoryDto> SubCategories { get; set; } = new List<SubCategoryDto>();
    }
}