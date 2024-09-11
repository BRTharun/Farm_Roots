using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Data
{
    public class ManufacturerDbContext :DbContext
    {
        public ManufacturerDbContext(DbContextOptions<ManufacturerDbContext>options) : base(options) { }
        
        public DbSet<Manufacturer> Manufacturers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
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
        }
    }
}
