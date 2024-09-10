using Epm.FarmRoots.ProductCatalogue.Application.Dtos;

namespace Epm.FarmRoots.ProductCatalogue.Application.Interfaces
{
    public interface ICategoryService
    {
        Task<CategoryDto> GetCategoryByIdAsync(int id);
        Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync();
        Task<IEnumerable<ProductDto>> GetProductsByCategoryIdAsync(int categoryId);
        Task<IEnumerable<SubCategoryDto>> GetSubcategoriesByCategoryIdAsync(int categoryId);

        Task<IEnumerable<CustomerProductViewDto>> GetCustomerProductsByCategoryIdAsync(int categoryId);
    }
}
