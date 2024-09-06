using Microsoft.EntityFrameworkCore;

using Epm.FarmRoots.ProductCatalogue.Core.Entities;

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(p => p.ProductId);

                entity.Property(p => p.ProductName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(p => p.ProductDescription)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(p => p.ProductCategory)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(p => p.ProductStock)
                    .IsRequired()
                    .HasDefaultValue(0);

                entity.Property(p => p.ProductMrp)
                    .IsRequired()
                    .HasColumnType("decimal(18, 2)")
                    .HasPrecision(18, 2);

                entity.Property(p => p.ProductSale_Price)
                    .IsRequired()
                    .HasColumnType("decimal(18, 2)")
                    .HasPrecision(18, 2);

                entity.Property(e => e.ProductImage).IsRequired();
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}