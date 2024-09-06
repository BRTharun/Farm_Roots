using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Epm.FarmRoots.ProductCatalogue.Core.Interfaces;

namespace Epm.FarmRoots.ProductCatalogue.Application.Services
{
    public class ProductSearchService : IProductSearchService
    {
        private readonly IProductSearchRepository _productRepository;

        public ProductSearchService(IProductSearchRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<IEnumerable<Product>> SearchProductsByNameAsync(string name)
        {
            return await _productRepository.SearchProductsAsync(name);
        }

        public async Task<IEnumerable<Product>> SearchProductsByVoiceAsync(string voiceCommand)
        {
            return await _productRepository.SearchProductsAsync(voiceCommand);
        }
    }
}