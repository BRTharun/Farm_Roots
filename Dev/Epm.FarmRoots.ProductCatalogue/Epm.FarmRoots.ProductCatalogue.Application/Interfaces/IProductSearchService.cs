using Epm.FarmRoots.ProductCatalogue.Core.Entities;

namespace Epm.FarmRoots.ProductCatalogue.Core.Interfaces
{
    public interface IProductSearchService
    {
        Task<IEnumerable<Product>> SearchProductsByNameAsync(string name);
        Task<IEnumerable<Product>> SearchProductsByVoiceAsync(string voiceCommand);
    }
}
