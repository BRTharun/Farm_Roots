using Epm.FarmRoots.ProductCatalogue.Application.Dtos;
using Epm.FarmRoots.ProductCatalogue.Core.Entities;

namespace Epm.FarmRoots.ProductCatalogue.Application.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<ResponseProductDto>> GetAllProductsAsync();
        Task<ResponseProductDto> GetProductByIdAsync(int id);
        Task<ResponseProductDto> CreateProductAsync(CreateProductDto product);
        Task UpdateProductAsync(ResponseProductDto product);
        Task DeleteProductAsync(int id);
    }
}