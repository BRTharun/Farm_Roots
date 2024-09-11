namespace Epm.FarmRoots.ProductCatalogue.Application.Dtos
{
    public class InventoryDto
    {
        public int ProductId { get; set; }

        public int ProductStockQuantity { get; set; }

        public int ProductMinCartQuantity { get; set; }

        public int ProductMaxCartQuantity { get; set; }
    }
}
