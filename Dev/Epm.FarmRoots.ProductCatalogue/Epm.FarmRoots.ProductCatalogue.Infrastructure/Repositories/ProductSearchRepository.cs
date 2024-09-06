using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Epm.FarmRoots.ProductCatalogue.Core.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Repositories
{
    public class ProductSearchRepository : IProductSearchRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductSearchRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> SearchProductsAsync(string keyword)
        {
            var keywords = keyword.Split(' ').Select(k => k.Trim().ToLower()).Where(k => !string.IsNullOrEmpty(k)).Distinct();

            return await _context.Products
                                 .Where(p => keywords.Any(k => p.ProductName.ToLower().Contains(k) || p.ProductDescription.ToLower().Contains(k)))
                                 .ToListAsync();
        }
    }
}
