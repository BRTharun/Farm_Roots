using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Epm.FarmRoots.ProductCatalogue.Core.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Repositories
{
    public class SubCategoryRepo : ISubCategoryRepository
    {
        private readonly ProductCatalogueDbContext _catalogueContext;
        private readonly IServiceProvider _serviceProvider;  // For accessing ProductDbContext

        public SubCategoryRepo(ProductCatalogueDbContext catalogueContext, IServiceProvider serviceProvider)
        {
            _catalogueContext = catalogueContext;
            _serviceProvider = serviceProvider;
        }

        public async Task AddSubCategoryAsync(SubCategory subCategory)
        {
            if (subCategory == null)
                throw new ArgumentNullException(nameof(subCategory));

            await _catalogueContext.SubCategories.AddAsync(subCategory);
            await _catalogueContext.SaveChangesAsync();
        }

        public async Task DeleteSubCategoryAsync(int subCategoryId)
        {
            var subCategory = await _catalogueContext.SubCategories.FindAsync(subCategoryId);
            if (subCategory == null)
                throw new KeyNotFoundException($"No subcategory found with ID {subCategoryId}");

            _catalogueContext.SubCategories.Remove(subCategory);
            await _catalogueContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<SubCategory>> GetAllSubCategoriesAsync()
        {
            return await _catalogueContext.SubCategories.ToListAsync();
        }

        public async Task<SubCategory> GetSubCategoryByIdAsync(int subCategoryId)
        {
            var subCategory = await _catalogueContext.SubCategories
                                              .FirstOrDefaultAsync(sc => sc.SubCategoryId == subCategoryId);
            if (subCategory == null)
                throw new KeyNotFoundException($"No subcategory found with ID {subCategoryId}");

            return subCategory;
        }

        public async Task UpdateSubCategoryAsync(SubCategory subCategory)
        {
            if (subCategory == null)
                throw new ArgumentNullException(nameof(subCategory));

            _catalogueContext.SubCategories.Update(subCategory);
            await _catalogueContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Product>> GetProductsBySubCategoryIdAsync(int subCategoryId)
        {

            using (var scope = _serviceProvider.CreateScope())
            {
                var productContext = scope.ServiceProvider.GetRequiredService<ProductDbContext>();
                var products = await productContext.Products
                    .Where(p => p.SubCategoryId == subCategoryId)
                    .Include(p => p.Price)   
                    .Include(p => p.Images) 
                    .ToListAsync();

                return products;
            }
        }
    }
}