using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.ProductCatalogue.Core.Entities
{
    public class Product
    {
        public required int ProductId { get; set; }
        
        public required string ProductName { get; set; }

        public required string ProductDescription { get; set; }

       
        public required string ProductCategory { get; set; }
        
        public required int ProductStock { get; set; }

        
        public required decimal ProductMrp { get; set; }

        public required decimal ProductSale_Price { get; set; }

        public required byte[] ProductImage { get; set; }

    }
}
