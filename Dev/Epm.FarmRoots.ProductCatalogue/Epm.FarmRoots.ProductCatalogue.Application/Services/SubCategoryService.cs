using AutoMapper;
using Epm.FarmRoots.ProductCatalogue.Application.Dtos;
using Epm.FarmRoots.ProductCatalogue.Application.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Epm.FarmRoots.ProductCatalogue.Core.Interfaces;

namespace Epm.FarmRoots.ProductCatalogue.Application.Services
{
    public class SubCategoryService : ISubCategoryService
    {
        private readonly ISubCategoryRepository _subCategoryRepository;
        private readonly IMapper _mapper;

        public SubCategoryService(ISubCategoryRepository subCategoryRepository, IMapper mapper)
        {
            _subCategoryRepository = subCategoryRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CreateProductDto>> GetProductsBySubCategoryIdAsync(int subCategoryId)
        {
            var products = await _subCategoryRepository.GetProductsBySubCategoryIdAsync(subCategoryId);
            return _mapper.Map<IEnumerable<CreateProductDto>>(products);
        }

        public async Task<IEnumerable<CustomerProductViewDto>> GetCustomerProductsBySubCategoryIdAsync(int subCategoryId)
        {
            var products = await _subCategoryRepository.GetProductsBySubCategoryIdAsync(subCategoryId);
            var productDtos = _mapper.Map<IEnumerable<CustomerProductViewDto>>(products);
            return productDtos;
        }
    }
}
