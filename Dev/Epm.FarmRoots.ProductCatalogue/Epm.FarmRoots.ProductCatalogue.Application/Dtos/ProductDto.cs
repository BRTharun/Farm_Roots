using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.ProductCatalogue.Application.Dtos
{
    public class ProductDto
    {
        public int ProductId { get; set; }
        public required string ProductName { get; set; }
        public required string ProductDescription { get; set; }
        public required string ProductCategory { get; set; }
        public int ProductStock { get; set; }
        public decimal ProductMrp { get; set; }
        public decimal ProductSalePrice { get; set; }
        public string? ProductImage { get; set; }
    }
}
