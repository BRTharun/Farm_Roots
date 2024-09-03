// IProductService.cs
using Epm.FarmRoots.ProductCatalogue.Application.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epm.FarmRoots.ProductCatalogue.Application.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDto>> GetAllProductsAsync();
        Task<ProductDto> GetProductByIdAsync(int id);
        Task AddProductAsync(ProductDto productDto);
        Task UpdateProductAsync(ProductDto productDto);
        Task DeleteProductAsync(int id);
    }
}