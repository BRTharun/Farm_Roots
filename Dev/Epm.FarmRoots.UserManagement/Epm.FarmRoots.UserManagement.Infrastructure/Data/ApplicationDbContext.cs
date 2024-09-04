#pragma warning disable
using Epm.FarmRoots.UserManagement.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .HasAnnotation("ErrorMessage", "Name is required.")
                    .HasAnnotation("ErrorMessage", "Name cannot be longer than 20 characters.");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasAnnotation("ErrorMessage", "Email is required.")
                    .HasAnnotation("ErrorMessage", "Email cannot be longer than 50 characters.")
                    .HasAnnotation("EmailAddress", "EmailAddress");

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasMaxLength(10)
                    .HasAnnotation("ErrorMessage", "Phone number is required.")
                    .HasAnnotation("ErrorMessage", "Phone number must be exactly 10 digits.");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasAnnotation("DataType", "Password")
                    .HasAnnotation("ErrorMessage", "Password is required.");
            });


            modelBuilder.Entity<Vendor>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .HasAnnotation("ErrorMessage", "Name is required.")
                    .HasAnnotation("ErrorMessage", "Name cannot be longer than 40 characters.");


                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasAnnotation("ErrorMessage", "Email is required.")
                    .HasAnnotation("ErrorMessage", "Email cannot be longer than 50 characters.")
                    .HasAnnotation("EmailAddress", "EmailAddress");

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasMaxLength(10)
                    .HasAnnotation("ErrorMessage", "Phone number is required.")
                    .HasAnnotation("ErrorMessage", "Phone number must be exactly 10 digits.");

                entity.Property(e => e.Password)
                   .IsRequired()
                   .HasAnnotation("DataType", "Password")
                   .HasAnnotation("ErrorMessage", "Password is required.");
            });
        }

    }
}
