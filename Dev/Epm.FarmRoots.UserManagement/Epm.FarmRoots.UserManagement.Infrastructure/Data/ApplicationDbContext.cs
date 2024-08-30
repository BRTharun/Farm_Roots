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

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    if (!optionsBuilder.IsConfigured)
        //    {
        //        optionsBuilder.UseSqlServer("Server=EPINHYDW1074;Database=LocalGoods;Trusted_Connection=True;");
        //    }
        //}
        
           // server=;Database=LocalGoods;Trusted_Connection=True;MultipleActiveResultSets=true;Encrypt=False
        public DbSet<Customer> CustomerDb { get; set; }
        public DbSet<Vendor> VendorDb { get; set; }

        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);

        //    modelBuilder.Entity<Customer>().Property(c => c.Email).IsRequired().HasMaxLength(100);
        //}

    }
}
