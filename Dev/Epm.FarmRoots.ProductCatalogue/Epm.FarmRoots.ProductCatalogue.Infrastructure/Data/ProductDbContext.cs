using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Microsoft.EntityFrameworkCore;

using Epm.FarmRoots.ProductCatalogue.Core.Entities;

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Data
{
    public class ProductDbContext : DbContext
    {
        public ProductDbContext(DbContextOptions<ProductDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
        public DbSet<Images> Images { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<SubCategory> SubCategory { get; set; }
        public DbSet<Inventory> Inventory { get; set; }
        public DbSet<Manufacturer> Manufacturer { get; set; }
        public DbSet<Price> Price { get; set; }

        byte[] defaultCategoryImage = Convert.FromBase64String("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");
        byte[] defaultSubCategoryImage = Convert.FromBase64String("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");

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

                //modelBuilder.Entity<Product>()
                //    .HasOne(p => p.Manufacturer)
                //    .WithOne()
                //    .HasForeignKey<Manufacturer>(c => c.ProductId);

                modelBuilder.Entity<Product>()
                    .HasOne(p => p.Manufacturer)
                    .WithMany()
                    .HasForeignKey(p => p.ManufacturerId);

                modelBuilder.Entity<Product>()
                    .HasOne(p => p.Inventory)
                    .WithOne()
                    .HasForeignKey<Inventory>(c => c.ProductId);

                modelBuilder.Entity<Product>()
                    .HasMany(p => p.Images)
                    .WithOne()
                    .HasForeignKey(c => c.ProductId);

                //modelBuilder.Entity<Product>()
                //    .HasOne(p => p.Category)
                //    .WithOne()
                //    .HasForeignKey<Product>(c => c.ProductId);

                modelBuilder.Entity<Product>()
                    .HasOne(p => p.Category) // Each product has one Category
                    .WithMany() // No navigation property back to Products in Category
                    .HasForeignKey(p => p.CategoryId); // Foreign key in Product pointing to Category

                modelBuilder.Entity<Images>(entity =>
                {
                    entity.HasKey(e => e.ImagesId);
                    entity.Property(e => e.ImageUrl)
                          .HasMaxLength(2048); 
                    entity.Property(e => e.ImageData)
                          .HasColumnType("varbinary(max)"); 
                    entity.Property(e => e.ProductId)
                          .IsRequired(); 
                });

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

                modelBuilder.Entity<Manufacturer>(entity =>
                {
                    entity.HasKey(e => e.ManufactureId);
                    entity.Property(e => e.ManufactureName)
                          .IsRequired()
                          .HasMaxLength(255);

                    entity.Property(e => e.ManufactureFeaturedStatus)
                          .IsRequired();

                    entity.Property(e => e.ManufactureDisplayOrder)
                          .IsRequired();

                    entity.Property(e => e.IsActive)
                          .IsRequired();
                    entity.ToTable("Manufacturers");
                });


                modelBuilder.Entity<Manufacturer>().HasData(
                new Manufacturer { ManufactureId = 1, ManufactureName = "Dole Food Company", ManufactureFeaturedStatus = false, ManufactureDisplayOrder = 0 },
                new Manufacturer { ManufactureId = 2, ManufactureName = "Driscoll’s", ManufactureFeaturedStatus = false, ManufactureDisplayOrder = 0 },
                new Manufacturer { ManufactureId = 3, ManufactureName = "Chiquita Brands International", ManufactureFeaturedStatus = false, ManufactureDisplayOrder = 0 },
                new Manufacturer { ManufactureId = 4, ManufactureName = "Green Giant", ManufactureFeaturedStatus = false, ManufactureDisplayOrder = 0 },
                new Manufacturer { ManufactureId = 5, ManufactureName = "The Little Potato Company", ManufactureFeaturedStatus = false, ManufactureDisplayOrder = 0 },
                new Manufacturer { ManufactureId = 6, ManufactureName = "Tyson Foods", ManufactureFeaturedStatus = false, ManufactureDisplayOrder = 0 },
                new Manufacturer { ManufactureId = 7, ManufactureName = "Danone", ManufactureFeaturedStatus = false, ManufactureDisplayOrder = 0 },
                new Manufacturer { ManufactureId = 8, ManufactureName = "Coca-Cola", ManufactureFeaturedStatus = false, ManufactureDisplayOrder = 0 },
                new Manufacturer { ManufactureId = 9, ManufactureName = "PepsiCo", ManufactureFeaturedStatus = false, ManufactureDisplayOrder = 0 },
                new Manufacturer { ManufactureId = 10, ManufactureName = "General Mills", ManufactureFeaturedStatus = false, ManufactureDisplayOrder = 0 },
                new Manufacturer { ManufactureId = 11, ManufactureName = "Lay's", ManufactureFeaturedStatus = false, ManufactureDisplayOrder = 0 },
                new Manufacturer { ManufactureId = 12, ManufactureName = "Haldiram's", ManufactureFeaturedStatus = false, ManufactureDisplayOrder = 0 },
                new Manufacturer { ManufactureId = 13, ManufactureName = "Dettol", ManufactureFeaturedStatus = false, ManufactureDisplayOrder = 0 },
                new Manufacturer { ManufactureId = 14, ManufactureName = "Nestlé", ManufactureFeaturedStatus = false, ManufactureDisplayOrder = 0 },
                new Manufacturer { ManufactureId = 15, ManufactureName = "Dove", ManufactureFeaturedStatus = false, ManufactureDisplayOrder = 0 }
            );
                modelBuilder.Entity<Price>(entity =>
                {
                    entity.HasKey(p => p.PriceId);

                    entity.Property(p => p.SalePrice)
                        .IsRequired()
                        .HasColumnType("decimal(18, 2)");

                    entity.Property(p => p.Mrp)
                        .IsRequired()
                        .HasColumnType("decimal(18, 2)");

                    entity.Property(p => p.SpecialPrice)
                        .HasColumnType("decimal(18, 2)");

                    entity.Property(p => p.SpecialPriceFromDate)
                        .HasColumnType("datetime2");

                    entity.Property(p => p.SpecialPriceToDate)
                        .HasColumnType("datetime2");

                    entity.Property(p => p.Discount)
                        .IsRequired()
                        .HasColumnType("decimal(18, 2)");

                    entity.Property(p => p.ProductCost)
                        .IsRequired()
                        .HasColumnType("decimal(18, 2)");

                    entity.Property(p => p.IsBuyButtonDisabled)
                        .IsRequired();


                });


            });

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
                new Category { CategoryId = 1, CategoryName = "Fruits", ImageUrl = defaultCategoryImage },
                new Category { CategoryId = 2, CategoryName = "Vegetables", ImageUrl = defaultCategoryImage },
                new Category { CategoryId = 3, CategoryName = "Meat, Fish and Eggs", ImageUrl = defaultCategoryImage },
                new Category { CategoryId = 4, CategoryName = "Dairy Products", ImageUrl = defaultCategoryImage },
                new Category { CategoryId = 5, CategoryName = "Cool drinks and juices", ImageUrl = defaultCategoryImage },
                new Category { CategoryId = 6, CategoryName = "Condiments and Spices", ImageUrl = defaultCategoryImage },
                new Category { CategoryId = 7, CategoryName = "Baked Goods", ImageUrl = defaultCategoryImage },
                new Category { CategoryId = 8, CategoryName = "Grains", ImageUrl = defaultCategoryImage },
                new Category { CategoryId = 9, CategoryName = "Treats", ImageUrl = defaultCategoryImage },
                new Category { CategoryId = 10, CategoryName = "Snacks", ImageUrl = defaultCategoryImage },
                new Category { CategoryId = 11, CategoryName = "Health and Wellness", ImageUrl = defaultCategoryImage },
                new Category { CategoryId = 12, CategoryName = "Tea and coffee, more", ImageUrl = defaultCategoryImage },
                new Category { CategoryId = 13, CategoryName = "Cleaning essentials", ImageUrl = defaultCategoryImage },
                new Category { CategoryId = 14, CategoryName = "Body care", ImageUrl = defaultCategoryImage },
                new Category { CategoryId = 15, CategoryName = "Other", ImageUrl = defaultCategoryImage }
            );

            modelBuilder.Entity<SubCategory>().HasData(
                // Subcategories for Fruits (CategoryId = 1)
                new SubCategory { SubCategoryId = 1, SubCategoryName = "Citrus fruits", CategoryId = 1, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 2, SubCategoryName = "Berries", CategoryId = 1, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 3, SubCategoryName = "Fresh fruits", CategoryId = 1, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 4, SubCategoryName = "Tropical fruits", CategoryId = 1, ImageUrl = defaultSubCategoryImage },

                // Subcategories for Vegetables (CategoryId = 2)
                new SubCategory { SubCategoryId = 5, SubCategoryName = "Leafy greens", CategoryId = 2, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 6, SubCategoryName = "Root vegetables", CategoryId = 2, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 7, SubCategoryName = "Fresh vegetables", CategoryId = 2, ImageUrl = defaultSubCategoryImage },

                // Subcategories for Meat, Fish and Eggs (CategoryId = 3)
                new SubCategory { SubCategoryId = 8, SubCategoryName = "Chicken", CategoryId = 3, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 9, SubCategoryName = "Fish and sea-food", CategoryId = 3, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 10, SubCategoryName = "Mutton", CategoryId = 3, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 11, SubCategoryName = "Eggs", CategoryId = 3, ImageUrl = defaultSubCategoryImage },

                // Subcategories for Dairy Products (CategoryId = 4)
                new SubCategory { SubCategoryId = 12, SubCategoryName = "Milk", CategoryId = 4, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 13, SubCategoryName = "Cheese", CategoryId = 4, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 14, SubCategoryName = "Yogurt", CategoryId = 4, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 15, SubCategoryName = "Butter and Cream", CategoryId = 4, ImageUrl = defaultSubCategoryImage },

                // Subcategories for Cool drinks and juices (CategoryId = 5)
                new SubCategory { SubCategoryId = 16, SubCategoryName = "Soft drinks", CategoryId = 5, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 17, SubCategoryName = "Fruit juices", CategoryId = 5, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 18, SubCategoryName = "Herbal drinks", CategoryId = 5, ImageUrl = defaultSubCategoryImage },

                // Subcategories for Condiments and Spices (CategoryId = 6)
                new SubCategory { SubCategoryId = 19, SubCategoryName = "Honey", CategoryId = 6, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 20, SubCategoryName = "Jams and preserves", CategoryId = 6, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 21, SubCategoryName = "Hot sauces", CategoryId = 6, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 22, SubCategoryName = "Herbs", CategoryId = 6, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 23, SubCategoryName = "Spices", CategoryId = 6, ImageUrl = defaultSubCategoryImage },

                // Subcategories for Baked Goods (CategoryId = 7)
                new SubCategory { SubCategoryId = 24, SubCategoryName = "Bread", CategoryId = 7, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 25, SubCategoryName = "Pastries", CategoryId = 7, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 26, SubCategoryName = "Cakes", CategoryId = 7, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 27, SubCategoryName = "Cookies", CategoryId = 7, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 28, SubCategoryName = "Pies", CategoryId = 7, ImageUrl = defaultSubCategoryImage },

                // Subcategories for Grains (CategoryId = 8)
                new SubCategory { SubCategoryId = 29, SubCategoryName = "Wheat products", CategoryId = 8, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 30, SubCategoryName = "Rice", CategoryId = 8, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 31, SubCategoryName = "Corn", CategoryId = 8, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 32, SubCategoryName = "Oats", CategoryId = 8, ImageUrl = defaultSubCategoryImage },

                // Subcategories for Treats (CategoryId = 9)
                new SubCategory { SubCategoryId = 33, SubCategoryName = "Chocolates", CategoryId = 9, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 34, SubCategoryName = "Sweets", CategoryId = 9, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 35, SubCategoryName = "Protein bar", CategoryId = 9, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 36, SubCategoryName = "Premium chocolates", CategoryId = 9, ImageUrl = defaultSubCategoryImage },

                // Subcategories for Snacks (CategoryId = 10)
                new SubCategory { SubCategoryId = 37, SubCategoryName = "Chips", CategoryId = 10, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 38, SubCategoryName = "Namkeens", CategoryId = 10, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 39, SubCategoryName = "Dry Fruits and Nuts", CategoryId = 10, ImageUrl = defaultSubCategoryImage },

                // Subcategories for Health and Wellness (CategoryId = 11)
                new SubCategory { SubCategoryId = 40, SubCategoryName = "Handwash", CategoryId = 11, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 41, SubCategoryName = "Cold and Cough", CategoryId = 11, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 42, SubCategoryName = "Pain relief", CategoryId = 11, ImageUrl = defaultSubCategoryImage },

                // Subcategories for Tea and coffee, more (CategoryId = 12)
                new SubCategory { SubCategoryId = 43, SubCategoryName = "Tea", CategoryId = 12, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 44, SubCategoryName = "Coffee", CategoryId = 12, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 45, SubCategoryName = "Milk Drink mixes", CategoryId = 12, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 46, SubCategoryName = "Green and Herbal Tea", CategoryId = 12, ImageUrl = defaultSubCategoryImage },

                // Subcategories for Cleaning essentials (CategoryId = 13)
                new SubCategory { SubCategoryId = 47, SubCategoryName = "Cleaning tools", CategoryId = 13, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 48, SubCategoryName = "Detergents", CategoryId = 13, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 49, SubCategoryName = "Liquids", CategoryId = 13, ImageUrl = defaultSubCategoryImage },

                // Subcategories for Body care (CategoryId = 14)
                new SubCategory { SubCategoryId = 50, SubCategoryName = "Skin care", CategoryId = 14, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 51, SubCategoryName = "Hair care", CategoryId = 14, ImageUrl = defaultSubCategoryImage },
                new SubCategory { SubCategoryId = 52, SubCategoryName = "Soaps", CategoryId = 14, ImageUrl = defaultSubCategoryImage }
            );
        }
    }
}
