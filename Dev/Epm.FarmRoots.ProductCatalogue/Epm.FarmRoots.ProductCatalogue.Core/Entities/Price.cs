using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.ProductCatalogue.Core.Entities
{
    public class Price
    {
        public required int PriceId { get; set; }

        public required decimal SalePrice { get; set; }

        public required decimal Mrp { get; set; }

        public decimal SpecialPrice { get; set; }

        
        public DateTime SpecialPriceFromDate { get; set; }

        public DateTime SpecialPriceToDate { get; set; }

        public required decimal Discount { get; set; }

        public required decimal ProductCost { get; set; }

        
        public required bool IsBuyButtonDisabled { get; set; }

       
        public required int ProductId { get; set; }

        
    }
}
