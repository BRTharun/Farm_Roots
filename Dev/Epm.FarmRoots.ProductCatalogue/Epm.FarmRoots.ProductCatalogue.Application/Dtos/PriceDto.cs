namespace Epm.FarmRoots.ProductCatalogue.Application.Dtos
{
    public class PriceDto
    {
        public int PriceId { get; set; }
        public decimal SalePrice { get; set; }
        public decimal Mrp { get; set; }
        public decimal? SpecialPrice { get; set; }
        public DateTime? SpecialPriceFromDate { get; set; }
        public DateTime? SpecialPriceToDate { get; set; }
        public decimal Discount { get; set; }
        public decimal ProductCost { get; set; }
        public bool IsBuyButtonDisabled { get; set; }
        public int ProductId { get; set; }
    }
}