using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.ProductCatalogue.Core.Entities
{
    public class Product
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; }

        public string ProductDescription { get; set; }

        public string ProductCategory { get; set; }

        public int ProductStock { get; set; }

        public decimal ProductMrp { get; set; }

        public decimal ProductSale_Price { get; set; }

        public string ProductImage { get; set; }

    }
}
