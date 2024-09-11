namespace Epm.FarmRoots.ProductCatalogue.Application.Dtos
{
    public class ManufacturerDto
    {
        public int ManufactureId { get; set; }

        public string ManufactureName { get; set; }

        public bool ManufactureFeaturedStatus { get; set; }

        public int ManufactureDisplayOrder { get; set; }
    }
}
