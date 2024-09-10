using Epm.FarmRoots.ProductCatalogue.Application.Dtos;

namespace Epm.FarmRoots.ProductCatalogue.Application.Interfaces
{
    public interface ISubCategoryService
    {
        Task<IEnumerable<CustomerProductViewDto>> GetCustomerProductsBySubCategoryIdAsync(int id);
        Task<IEnumerable<ProductDto>> GetProductsBySubCategoryIdAsync(int subCategoryId);
    }
}