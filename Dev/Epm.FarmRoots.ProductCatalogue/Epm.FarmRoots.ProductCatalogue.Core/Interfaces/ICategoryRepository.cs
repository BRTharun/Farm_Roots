using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Epm.FarmRoots.ProductCatalogue.Core.Entities;
namespace Epm.FarmRoots.ProductCatalogue.Core.Interfaces
{
    public interface ICategoryRepository
    {
        Task<Category> GetCategoryByIdAsync(int id);
        Task<Category> GetCategoryByNameAsync(string name);
        Task AddCategoryAsync(Category category);
        Task<List<Category>> GetAllCategoriesAsync();
    }
}
