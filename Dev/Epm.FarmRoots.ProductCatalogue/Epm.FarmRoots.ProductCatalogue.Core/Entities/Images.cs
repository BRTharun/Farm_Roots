using System.ComponentModel.DataAnnotations;

namespace Epm.FarmRoots.ProductCatalogue.Core.Entities
{
    public class Images
    {
        [Key]
        public int ImagesId { get; set; }
        public string? ImageUrl { get; set; } 
        public byte[] ImageData { get; set; }
        public int ProductId { get; set; }
    }
}
