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

        // This property corresponds to whether the "Buy" button should be disabled
        public required bool IsBuyButtonDisabled { get; set; }

        // Foreign key for Product
        public required int ProductId { get; set; }

        // Navigation property for the Product
    }
}