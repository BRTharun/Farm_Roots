using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.ProductCatalogue.Application.Dtos
{
    public class ResponseProductDto
    {
        public int ProductId { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Today;
        public DateTime UpdatedOn { get; set; } = DateTime.Today;
        public string ProductType { get; set; } = "Simple Product";
        public required bool Published { get; set; }
        public required string ProductName { get; set; }
        public required string ShortDescription { get; set; }
        public string? FullDescription { get; set; }
        public string ProductCondition { get; set; } = "New";
        public List<string>? ProductTags { get; set; } = new List<string>();
        public int VendorId { get; set; }
    }
}
