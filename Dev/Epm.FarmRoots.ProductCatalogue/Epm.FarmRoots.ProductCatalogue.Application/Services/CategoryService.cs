using AutoMapper;
using Epm.FarmRoots.ProductCatalogue.Application.Dtos;
using Epm.FarmRoots.ProductCatalogue.Application.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Core.Interfaces;

namespace Epm.FarmRoots.ProductCatalogue.Application.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<CategoryDto> GetCategoryByIdAsync(int id)
        {
            var category = await _categoryRepository.GetCategoryByIdAsync(id);
            return _mapper.Map<CategoryDto>(category);
        }

        public async Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync()
        {
            var categories = await _categoryRepository.GetAllCategoriesAsync();
            return _mapper.Map<IEnumerable<CategoryDto>>(categories);
        }

        public async Task<IEnumerable<CreateProductDto>> GetProductsByCategoryIdAsync(int categoryId)
        {
            var products = await _categoryRepository.GetProductsByCategoryIdAsync(categoryId);
            return _mapper.Map<IEnumerable<CreateProductDto>>(products);
        }

        public async Task<IEnumerable<SubCategoryDto>> GetSubcategoriesByCategoryIdAsync(int categoryId)
        {
            var subcategories = await _categoryRepository.GetSubcategoriesByCategoryIdAsync(categoryId);
            return _mapper.Map<IEnumerable<SubCategoryDto>>(subcategories);
        }

        public async Task<IEnumerable<CustomerProductViewDto>> GetCustomerProductsByCategoryIdAsync(int categoryId)
        {
            var products = await _categoryRepository.GetProductsByCategoryIdAsync(categoryId);
            var productDtos = _mapper.Map<IEnumerable<CustomerProductViewDto>>(products);
            return productDtos;
        }

        public async Task<IEnumerable<CreateProductDto>> GetProductsBySubcategoryIdAsync(int subCategoryId)
        {
            var products = await _categoryRepository.GetProductsBySubcategoryIdAsync(subCategoryId);
            return _mapper.Map<IEnumerable<CreateProductDto>>(products);
        }
    }
}
