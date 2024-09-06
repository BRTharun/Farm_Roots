using Microsoft.EntityFrameworkCore;
using Epm.FarmRoots.ProductCatalogue.Core.Entities;


namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Data
{
    public class ProductCatalogueDbContext : DbContext
    {
        public ProductCatalogueDbContext(DbContextOptions<ProductCatalogueDbContext> options) : base(options) { }

        public DbSet<Category> Categories { get; set; }
        public DbSet<SubCategory> SubCategories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Category
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.CategoryId);
                entity.Property(e => e.CategoryName)
                      .IsRequired()
                      .HasMaxLength(100);
                entity.Property(e => e.ImageUrl);

                entity.HasMany(e => e.SubCategories)
                      .WithOne(sc => sc.Category)
                      .HasForeignKey(sc => sc.CategoryId);
            });

            // Configure SubCategory
            modelBuilder.Entity<SubCategory>(entity =>
            {
                entity.HasKey(e => e.SubCategoryId);
                entity.Property(e => e.SubCategoryName)
                      .IsRequired()
                      .HasMaxLength(100);
                entity.Property(e => e.ImageUrl);
                entity.Property(e => e.CategoryId);

                entity.HasOne(e => e.Category)
                      .WithMany(c => c.SubCategories)
                      .HasForeignKey(e => e.CategoryId);
            });

            // Seed data for Category
            modelBuilder.Entity<Category>().HasData(
                new Category { CategoryId = 1, CategoryName = "Fruits" },
                new Category { CategoryId = 2, CategoryName = "Vegetables" },
                new Category { CategoryId = 3, CategoryName = "Groceries" },
                new Category { CategoryId = 4, CategoryName = "Meat" }
            );
        }
    }
}
