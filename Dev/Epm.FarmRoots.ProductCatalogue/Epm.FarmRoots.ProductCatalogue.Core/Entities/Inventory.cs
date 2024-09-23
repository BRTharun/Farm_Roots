using System.ComponentModel.DataAnnotations;
namespace Epm.FarmRoots.ProductCatalogue.Core.Entities
{
    public class Inventory
    {
        [Key]
        public int InventoryId { get; set; }

        public int ProductStockQuantity { get; set; }

        public int ProductMinCartQuantity { get; set; }

        public int ProductMaxCartQuantity { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}
