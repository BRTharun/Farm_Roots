using System.ComponentModel.DataAnnotations;

namespace Epm.FarmRoots.ProductCatalogue.Core.Entities
{
    public class InventoryItem
    {
        [Key]
        public int ProductId { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Name must be between 3 and 100 characters long.")]
        public string? ProductName { get; set; }

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Stock must be a non-negative number.")]
        public int ProductStock { get; set; }

        [Required]
        public bool ProductStatus { get; set; }
    }
}
