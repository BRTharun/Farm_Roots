using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.ProductCatalogue.Core.Interfaces
{
    public interface ISubCategoryRepository
    {
        // Fetches all products associated with a specific subcategory.
        Task<IEnumerable<Product>> GetProductsBySubCategoryIdAsync(int subCategoryId);

        // Adds a new subcategory.
        Task AddSubCategoryAsync(SubCategory subCategory);

        // Retrieves a subcategory by its ID.
        Task<SubCategory> GetSubCategoryByIdAsync(int subCategoryId);

        // Retrieves all subcategories.
        Task<IEnumerable<SubCategory>> GetAllSubCategoriesAsync();

        // Updates an existing subcategory.
        Task UpdateSubCategoryAsync(SubCategory subCategory);

        // Deletes a subcategory by its ID.
        Task DeleteSubCategoryAsync(int subCategoryId);
    }
}
