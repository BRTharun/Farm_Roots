using Epm.FarmRoots.ProductCatalogue.Core.Entities;

namespace Epm.FarmRoots.ProductCatalogue.Core.Interfaces
{
    public interface IProductSearchRepository
    {
        Task<IEnumerable<Product>> SearchProductsAsync(string keyword);
    }
}
