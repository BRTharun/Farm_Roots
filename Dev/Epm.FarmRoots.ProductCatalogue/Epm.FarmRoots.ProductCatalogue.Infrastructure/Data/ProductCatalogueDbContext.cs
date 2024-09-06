using Microsoft.EntityFrameworkCore;
using Epm.FarmRoots.ProductCatalogue.Core.Entities;


namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Data
{
    public class ProductCatalogueDbContext : DbContext
    {
        public ProductCatalogueDbContext(DbContextOptions<ProductCatalogueDbContext> options) : base(options) { }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            modelBuilder.Entity<Category>().HasData(new Category
            {
                CategoryId = 1,
                CategoryName = "Fruits",
                ImageUrl = null
            });


            modelBuilder.Entity<Category>().HasData(new Category
            {
                CategoryId = 2,
                CategoryName = "Vegetables",
                ImageUrl = null
            });

            modelBuilder.Entity<Category>().HasData(new Category
            {
                CategoryId = 3,
                CategoryName = "Groceries",
                ImageUrl = null
            });

            modelBuilder.Entity<Category>().HasData(new Category
            {
                CategoryId = 4,
                CategoryName = "Meat",
                ImageUrl = null
            });
        }
    }
}
