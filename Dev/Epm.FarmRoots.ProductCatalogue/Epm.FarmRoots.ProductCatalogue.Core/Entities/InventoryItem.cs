using System.ComponentModel.DataAnnotations;

namespace Epm.FarmRoots.ProductCatalogue.Core.Entities
{
    public class InventoryItem
    {
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public int ProductStock { get; set; }
        public bool ProductStatus { get; set; }
    }
}
