using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Data
{
    public class InventoryDbContext :DbContext
    {
        public InventoryDbContext(DbContextOptions<InventoryDbContext> options) : base(options)
        {
        }

        public DbSet<InventoryItem> InventoryItems { get; set; }
    }
}