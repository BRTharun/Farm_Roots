using Microsoft.EntityFrameworkCore;
using Epm.FarmRoots.ProductCatalogue.Core.Entities;

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Price> Prices { get; set; }
        public DbSet<Inventory> Inventories { get; set; }
        public DbSet<Images> Images { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Manufacturer> Manufacturers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(p => p.ProductId);

                entity.Property(p => p.ProductName)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(p => p.ShortDescription)
                    .IsRequired()
                    .HasMaxLength(500);

                
                entity.Property(p => p.FullDescription)
                    .HasMaxLength(1000);

                
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
                    .WithMany() 
                    .HasForeignKey(p => p.CategoryId);

                entity.HasOne(p => p.Manufacturer)
                    .WithMany() 
                    .HasForeignKey(p => p.ManufacturerId);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}