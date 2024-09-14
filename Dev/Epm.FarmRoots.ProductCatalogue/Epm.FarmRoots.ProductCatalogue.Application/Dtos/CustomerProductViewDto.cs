namespace Epm.FarmRoots.ProductCatalogue.Application.Dtos
{
    public class CustomerProductViewDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ShortDescription { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; }
    }
}
