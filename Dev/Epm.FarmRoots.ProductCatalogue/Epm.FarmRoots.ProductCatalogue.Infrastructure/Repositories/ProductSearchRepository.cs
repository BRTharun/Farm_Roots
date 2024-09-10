using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Epm.FarmRoots.ProductCatalogue.Core.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Repositories
{
    public class ProductSearchRepository : IProductSearchRepository
    {
        private readonly ProductDbContext _context;

        public ProductSearchRepository(ProductDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> SearchProductsAsync(string keyword)
        {
            var keywords = keyword.Split(' ').Select(k => k.Trim().ToLower()).Where(k => !string.IsNullOrEmpty(k)).Distinct();

            return await _context.Products
                                 .Where(p => keywords.Any(k => p.ProductName.ToLower().Contains(k) || p.FullDescription.ToLower().Contains(k)))
                                 .ToListAsync();
        }
    }
}
