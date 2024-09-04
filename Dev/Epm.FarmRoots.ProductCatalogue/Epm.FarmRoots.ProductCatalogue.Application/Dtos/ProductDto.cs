﻿#pragma warning disable
using System;

namespace Epm.FarmRoots.ProductCatalogue.Application.Dtos
{
    public class ProductDto
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