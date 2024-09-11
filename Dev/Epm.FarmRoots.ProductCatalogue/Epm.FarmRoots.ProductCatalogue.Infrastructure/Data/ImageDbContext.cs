using Microsoft.EntityFrameworkCore;
using Epm.FarmRoots.ProductCatalogue.Core.Entities;

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure
{
    public class ImageDbContext : DbContext
    {
        public ImageDbContext(DbContextOptions<ImageDbContext> options)
            : base(options)
        {
        }

        public DbSet<Images> Images { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the Images entity
            modelBuilder.Entity<Images>(entity =>
            {
                entity.HasKey(e => e.ImagesId);
                entity.Property(e => e.ImageUrl)
                      .HasMaxLength(2048); // Adjust the length according to your requirements
                entity.Property(e => e.ImageData)
                      .HasColumnType("varbinary(max)"); // For storing binary data
                entity.Property(e => e.ProductId)
                      .IsRequired(); // Ensures ProductId is not null
            });

            // Configure any other entities here
        }
    }
}
