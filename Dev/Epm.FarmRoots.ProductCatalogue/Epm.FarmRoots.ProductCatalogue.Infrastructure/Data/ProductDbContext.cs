using Microsoft.EntityFrameworkCore;

using Epm.FarmRoots.ProductCatalogue.Core.Entities;

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Data
{
    public class ProductDbContext : DbContext
    {
        public ProductDbContext(DbContextOptions<ProductDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(p => p.ProductId);

                entity.Property(p => p.ProductName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(p => p.ShortDescription)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(p => p.FullDescription);

                entity.Property(p => p.ProductType)
                    .HasDefaultValue("Simple Product");

                entity.Property(p => p.ProductCondition)
                    .HasDefaultValue("New");

                entity.Property(p => p.CountryOfOrigin)
                    .HasDefaultValue("Not specified");

                entity.Property(p => p.CreatedOn)
                    .HasDefaultValueSql("GETDATE()");

                entity.Property(p => p.UpdatedOn)
                    .HasDefaultValueSql("GETDATE()");

                entity.Property(p => p.Published)
                    .IsRequired();

                entity.Property(p => p.ProductTags).HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());

                modelBuilder.Entity<Product>()
                .HasOne(p => p.Price)
                .WithOne()
                .HasForeignKey<Price>(c => c.ProductId);

                modelBuilder.Entity<Product>()
                    .HasOne(p => p.Manufacturer)
                    .WithOne()
                    .HasForeignKey<Manufacturer>(c => c.ProductId);

                modelBuilder.Entity<Product>()
                    .HasOne(p => p.Inventory)
                    .WithOne()
                    .HasForeignKey<Inventory>(c => c.ProductId);

                modelBuilder.Entity<Product>()
                    .HasOne(p => p.Images)
                    .WithOne()
                    .HasForeignKey<Images>(c => c.ProductId);
            });
        }
    }
}
