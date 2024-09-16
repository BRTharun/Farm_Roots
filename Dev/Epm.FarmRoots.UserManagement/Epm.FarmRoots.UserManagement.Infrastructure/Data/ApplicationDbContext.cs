
using Epm.FarmRoots.UserManagement.Core.Entities;
using Microsoft.EntityFrameworkCore;
namespace Epm.FarmRoots.UserManagement.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
           : base(options)
        {

        }
        public DbSet<Customer> CustomerDb { get; set; }
        public DbSet<Vendor> VendorDb { get; set; }
        public DbSet<CustomerAddress> CustomerAddressDb { get; set; }
        public DbSet<VendorAddress> VendorAddressDb { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.Property(e => e.Name).IsRequired().HasMaxLength(20).HasAnnotation("ErrorMessage", "Name is required.").HasAnnotation("ErrorMessage", "Name cannot be longer than 20 characters.");
                entity.Property(e => e.Email).IsRequired().HasMaxLength(50).HasAnnotation("ErrorMessage", "Email is required.").HasAnnotation("ErrorMessage", "Email cannot be longer than 50 characters.").HasAnnotation("EmailAddress", "EmailAddress");
                entity.Property(e => e.PhoneNumber).IsRequired().HasMaxLength(10).HasAnnotation("ErrorMessage", "Phone number is required.").HasAnnotation("ErrorMessage", "Phone number must be exactly 10 digits.");
                entity.Property(e => e.Password).IsRequired().HasAnnotation("DataType", "Password").HasAnnotation("ErrorMessage", "Password is required.");
            });

            modelBuilder.Entity<Vendor>(entity =>
            {
                entity.Property(e => e.Name).IsRequired().HasMaxLength(20).HasAnnotation("ErrorMessage", "Name is required.").HasAnnotation("ErrorMessage", "Name cannot be longer than 40 characters.");
                entity.Property(e => e.Email).IsRequired().HasMaxLength(50).HasAnnotation("ErrorMessage", "Email is required.").HasAnnotation("ErrorMessage", "Email cannot be longer than 50 characters.").HasAnnotation("EmailAddress", "EmailAddress");
                entity.Property(e => e.PhoneNumber).IsRequired().HasMaxLength(10).HasAnnotation("ErrorMessage", "Phone number is required.").HasAnnotation("ErrorMessage", "Phone number must be exactly 10 digits.");
                entity.Property(e => e.Password).IsRequired().HasAnnotation("DataType", "Password").HasAnnotation("ErrorMessage", "Password is required.");
            });

            modelBuilder.Entity<CustomerAddress>(entity =>
            {
                entity.HasOne<Customer>(s => s.Customer).WithMany(g => g.CustomerAddresses).HasForeignKey(s => s.CustomerId); 
                entity.Property(p => p.HouseNoAndFloor).IsRequired().HasMaxLength(50);
                entity.Property(p => p.BuildingAndBlockNo).IsRequired().HasMaxLength(50);
                entity.Property(p => p.Pincode).IsRequired().HasMaxLength(6);
                entity.Property(p => p.LandmarkAndAreaName).HasMaxLength(100);
            });

            modelBuilder.Entity<VendorAddress>(entity =>
            {
                entity.HasOne(v => v.Vendor).WithMany(g => g.VendorAddresses).HasForeignKey(v => v.VendorId);
                entity.Property(v => v.VendorShopName).IsRequired().HasMaxLength(100).HasAnnotation("MinLength", 3).IsUnicode(true).HasComment("Shop name must be between 3 and 100 characters long, including letters, numbers, spaces, and certain special characters like hyphens, apostrophes, and periods.");
                entity.Property(v => v.HouseNoAndFloor).IsRequired().HasMaxLength(50);
                entity.Property(v => v.BuildingAndBlockNo).IsRequired().HasMaxLength(50);
                entity.Property(v => v.Pincode).IsRequired().HasMaxLength(6);
                entity.Property(v => v.LandmarkAndAreaName).HasMaxLength(100);
            });

        }

    }
}
