﻿using System;
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

        public string ImageUrl { get; set; }

        public byte[]? ImageData { get; set; }

        public int ProductId { get; set; }

    }

}
