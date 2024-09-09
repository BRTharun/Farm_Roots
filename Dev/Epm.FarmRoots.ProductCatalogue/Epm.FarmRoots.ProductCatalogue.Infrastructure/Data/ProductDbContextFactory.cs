using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Data
{
    public class ProductDbContextFactory : IDesignTimeDbContextFactory<ProductDbContext>
    {
        public ProductDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ProductDbContext>();

            // Get the API project directory
            var basePath = Path.Combine(Directory.GetCurrentDirectory(), "..", "Epm.FarmRoots.ProductCatalogue.API");

            // Create configuration by pointing to appsettings.json in the API project
            var config = new ConfigurationBuilder()
                .SetBasePath(basePath) // Change base path to the API project
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = config.GetConnectionString("DefaultConnection");
            optionsBuilder.UseSqlServer(connectionString);

            return new ProductDbContext(optionsBuilder.Options);
        }
    }
}
