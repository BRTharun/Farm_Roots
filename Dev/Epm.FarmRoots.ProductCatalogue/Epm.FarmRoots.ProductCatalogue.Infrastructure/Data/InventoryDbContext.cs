using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Data
{
    public class InventoryDbContext : DbContext
    {
        public InventoryDbContext(DbContextOptions<InventoryDbContext> options) : base(options)
        {
        }

        public DbSet<InventoryItem> InventoryItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<InventoryItem>(entity =>
            {
                entity.HasKey(e => e.ProductId);

                entity.Property(e => e.ProductName)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("ProductName")
                    .HasComment("Name must be between 3 and 100 characters long.");

                entity.Property(e => e.ProductStock)
                    .IsRequired()
                    .HasAnnotation("Range", new[] { 0, int.MaxValue })
                    .HasColumnName("ProductStock")
                    .HasComment("Stock must be a non-negative number.");

                entity.Property(e => e.ProductStatus)
                    .IsRequired()
                    .HasColumnName("ProductStatus");
            });
        }
    }
}