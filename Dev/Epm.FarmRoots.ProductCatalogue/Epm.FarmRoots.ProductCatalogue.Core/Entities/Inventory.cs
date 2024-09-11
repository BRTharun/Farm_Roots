﻿using System.ComponentModel.DataAnnotations;
namespace Epm.FarmRoots.ProductCatalogue.Core.Entities
{
    public class Inventory
    {
        [Key]
        public int ProductId { get; set; }

        public int ProductStockQuantity { get; set; }

        public int ProductMinCartQuantity { get; set; }

        public int ProductMaxCartQuantity { get; set;}
    }
}