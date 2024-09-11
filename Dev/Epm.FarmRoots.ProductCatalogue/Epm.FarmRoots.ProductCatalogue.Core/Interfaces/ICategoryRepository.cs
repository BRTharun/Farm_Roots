using Epm.FarmRoots.ProductCatalogue.Core.Entities;
namespace Epm.FarmRoots.ProductCatalogue.Core.Interfaces
{
    public interface ICategoryRepository
    {
        Task<Category> GetCategoryByIdAsync(int id);
        Task<Category> GetCategoryByNameAsync(string name);
        Task AddCategoryAsync(Category category);
        Task<List<Category>> GetAllCategoriesAsync();
        Task<IEnumerable<Product>> GetProductsByCategoryIdAsync(int categoryId);
        Task<IEnumerable<SubCategory>> GetSubcategoriesByCategoryIdAsync(int categoryId);
    }
}
