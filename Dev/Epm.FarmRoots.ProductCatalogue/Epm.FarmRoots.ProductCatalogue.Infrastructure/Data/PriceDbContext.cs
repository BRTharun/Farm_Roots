using Microsoft.EntityFrameworkCore;
using Epm.FarmRoots.ProductCatalogue.Core.Entities;

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Data
{
    public class PriceDbContext : DbContext
    {
        public PriceDbContext(DbContextOptions<PriceDbContext> options) : base(options) { }
        public DbSet<Price> Prices { get; set; }  

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
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

            base.OnModelCreating(modelBuilder);
        }
    }
}