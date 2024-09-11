using System.ComponentModel.DataAnnotations;

namespace Epm.FarmRoots.ProductCatalogue.Core.Entities
{
    public class Manufacturer
    {
        [Key]
        public int ManufactureId { get; set; }
        public string ManufactureName { get; set; }
        public bool ManufactureFeaturedStatus { get; set; }
        public int ManufactureDisplayOrder { get; set; }
    }
}
