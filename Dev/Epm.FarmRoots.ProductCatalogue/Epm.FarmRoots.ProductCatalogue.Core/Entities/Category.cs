using System.ComponentModel.DataAnnotations;

namespace Epm.FarmRoots.ProductCatalogue.Core.Entities
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }
        [Required]
        public required string CategoryName {  get; set; }
        public string? ImageUrl { get; set; }
    }
}
