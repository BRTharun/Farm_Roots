using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.ProductCatalogue.Core.Entities
{
    public class Images
    {
        [Key]
        public int ImagesId { get; set; }
        public string? ImageUrl { get; set; } // Store image URL if you're saving images in the filesystem
        public byte[] ImageData { get; set; } // Option to store image as binary data if using database storage
        public int ProductId { get; set; }
    }
}
