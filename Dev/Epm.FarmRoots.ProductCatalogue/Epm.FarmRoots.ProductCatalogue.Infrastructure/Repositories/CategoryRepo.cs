﻿using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Epm.FarmRoots.ProductCatalogue.Core.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Infrastructure.Data;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Repositories
{
    public class CategoryRepo : ICategoryRepository
    {
        private readonly ProductDbContext _dbContext;

        private readonly IServiceProvider _serviceProvider;

        public CategoryRepo(ProductDbContext dbContext, IServiceProvider serviceProvider)
        {
            _dbContext = dbContext;
            _serviceProvider = serviceProvider;
        }

        public async Task AddCategoryAsync(Category category)
        {
            if (category == null)
            {
                throw new ArgumentNullException(nameof(category));
            }

            _ = _dbContext.Category.AddAsync(category);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Category> GetCategoryByIdAsync(int id)
        {
            var category = await _dbContext.Category.FirstOrDefaultAsync(c => c.CategoryId == id);
            if (category == null)
            {
                throw new KeyNotFoundException($"No category found with ID {id}");
            }
            return category;
        }

        public async Task<Category> GetCategoryByNameAsync(string name)
        {
            var category = await _dbContext.Category.FirstOrDefaultAsync(c => c.CategoryName == name);
            if (category == null)
            {
                throw new KeyNotFoundException($"No category found with name '{name}'");
            }
            return category;
        }

        public async Task<List<Category>> GetAllCategoriesAsync()
        {
            var categories = await _dbContext.Category.ToListAsync();
            return categories;
        }

        public async Task<IEnumerable<Product>> GetProductsByCategoryIdAsync(int categoryId)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var productContext = scope.ServiceProvider.GetRequiredService<ProductDbContext>();
                var products = await productContext.Products
                    .Where(p => p.CategoryId == categoryId)
                    .Include(p => p.Price)
                    .Include(p => p.Images)
                    .ToListAsync();

                return products;
            }
        }

        public async Task<IEnumerable<SubCategory>> GetSubcategoriesByCategoryIdAsync(int categoryId)
        {
            var subcategories = await _dbContext.SubCategory
                .Where(sc => sc.CategoryId == categoryId)
                .ToListAsync();

            return subcategories;
        }
        public async Task<IEnumerable<Product>> GetProductsBySubcategoryIdAsync(int subCategoryId)
        {
            return await _dbContext.Products
                                 .Where(p => p.SubCategoryId == subCategoryId)
                                 .ToListAsync();
        }
    }
}
