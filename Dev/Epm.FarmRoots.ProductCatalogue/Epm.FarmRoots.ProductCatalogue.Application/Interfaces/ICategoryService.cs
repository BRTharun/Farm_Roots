using Epm.FarmRoots.ProductCatalogue.Application.Dtos;

namespace Epm.FarmRoots.ProductCatalogue.Application.Interfaces
{
    public interface ICategoryService
    {
        Task<CategoryDto> GetCategoryByIdAsync(int id);
        Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync();
    }
}
