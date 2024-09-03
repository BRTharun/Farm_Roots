using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Data
{
    public class ProductDbContext : DbContext
    {
        public ProductDbContext(DbContextOptions<ProductDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}