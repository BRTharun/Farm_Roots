using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.ProductCatalogue.Core.Entities
{
    public class SubCategory
    {
        public int SubCategoryId { get; set; }
        public required string SubCategoryName { get; set; }
        public int CategoryId { get; set; }
        public byte[]? ImageUrl { get; set; }
        public Category Category { get; set; }
    }
}
