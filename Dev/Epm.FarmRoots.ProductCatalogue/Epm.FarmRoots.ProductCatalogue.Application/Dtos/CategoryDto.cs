using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.ProductCatalogue.Application.Dtos
{
    public class CategoryDto
    {
        public int CategoryId { get; set; }
        public required string CategoryName {  get; set; }
        public string? ImageUrl {  get; set; }  
    }
}
