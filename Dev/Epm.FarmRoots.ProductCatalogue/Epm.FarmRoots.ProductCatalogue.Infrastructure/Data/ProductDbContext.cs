using Microsoft.EntityFrameworkCore;

using Epm.FarmRoots.ProductCatalogue.Core.Entities;

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Data
{
    public class ProductDbContext : DbContext
    {
        public ProductDbContext(DbContextOptions<ProductDbContext> options) : base(options)
        {
        }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(p => p.ProductId);

                entity.Property(p => p.ProductName)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(p => p.ShortDescription)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(p => p.FullDescription).HasMaxLength(500); ;

                entity.Property(p => p.Url)
                    .HasMaxLength(255);

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

                // Configure relationships
                entity.HasOne(p => p.Price)
                      .WithOne()
                      .HasForeignKey<Product>(p => p.PriceId);

                entity.HasOne(p => p.Inventory)
                      .WithOne()
                      .HasForeignKey<Product>(p => p.InventoryId);

                entity.HasOne(p => p.Images)
                      .WithOne()
                      .HasForeignKey<Product>(p => p.ImagesId);

                entity.HasOne(p => p.Category)
                      .WithOne()
                      .HasForeignKey<Product>(p => p.CategoryId);

                entity.HasOne(p => p.Manufacturer)
                      .WithOne()
                      .HasForeignKey<Product>(p => p.ManufacturerId);
            });

            //modelBuilder.Entity<Price>()
            //    .HasKey(p => p.PriceId);

            //modelBuilder.Entity<Inventory>()
            //    .HasKey(i => i.InventoryId);

            //modelBuilder.Entity<Images>()
            //    .HasKey(i => i.ImagesId);

            //modelBuilder.Entity<Category>()
            //    .HasKey(c => c.CategoryId);

            //modelBuilder.Entity<Manufacturer>()
            //    .HasKey(m => m.ManufacturerId);
        }
    }
}