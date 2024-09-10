using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Data
{
    public class InventoryCartDbContext : DbContext
    {
        public InventoryCartDbContext(DbContextOptions<InventoryCartDbContext> options)
        : base(options)
        {
        }
        public DbSet<Inventory> Inventories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Inventory>(entity =>
            {
                entity.HasKey(e => e.ProductId);

                entity.Property(e => e.ProductStockQuantity)
                      .IsRequired();

                entity.Property(e => e.ProductMinCartQuantity)
                      .IsRequired();

                entity.Property(e => e.ProductMaxCartQuantity)
                      .IsRequired();
                entity.ToTable("Inventories");
            });
        }

    }
}
