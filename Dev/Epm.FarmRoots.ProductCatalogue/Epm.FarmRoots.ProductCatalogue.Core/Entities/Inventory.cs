using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.ProductCatalogue.Core.Entities
{
    public class Inventory
    {
        [Key]
        public int ProductId { get; set; }

        public int ProductStockQuantity { get; set; }

        public int ProductMinCartQuantity { get; set; }

        public int ProductMaxCartQuantity { get; set; }
    }
}
