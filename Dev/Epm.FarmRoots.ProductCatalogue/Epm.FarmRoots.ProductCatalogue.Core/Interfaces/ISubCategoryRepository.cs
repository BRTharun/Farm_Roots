using Epm.FarmRoots.ProductCatalogue.Core.Entities;

namespace Epm.FarmRoots.ProductCatalogue.Core.Interfaces
{
    public interface ISubCategoryRepository
    {
        Task<IEnumerable<Product>> GetProductsBySubCategoryIdAsync(int subCategoryId);

        Task AddSubCategoryAsync(SubCategory subCategory);

        Task<SubCategory> GetSubCategoryByIdAsync(int subCategoryId);

        Task<IEnumerable<SubCategory>> GetAllSubCategoriesAsync();

        Task UpdateSubCategoryAsync(SubCategory subCategory);

        Task DeleteSubCategoryAsync(int subCategoryId);
    }
}
