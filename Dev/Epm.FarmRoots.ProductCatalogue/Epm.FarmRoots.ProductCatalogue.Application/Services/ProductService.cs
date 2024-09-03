using Epm.FarmRoots.ProductCatalogue.Application.Dtos;
using Epm.FarmRoots.ProductCatalogue.Application.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Core.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epm.FarmRoots.ProductCatalogue.Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        // Corrected constructor
        public ProductService(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
        {
            var products = await _productRepository.GetAllProductsAsync();
            return _mapper.Map<IEnumerable<ProductDto>>(products);
        }

        public async Task<ProductDto> GetProductByIdAsync(int id)
        {
            var product = await _productRepository.GetProductByIdAsync(id);
            return _mapper.Map<ProductDto>(product);
        }

        public async Task AddProductAsync(ProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            await _productRepository.AddProductAsync(product);
        }

        public async Task UpdateProductAsync(ProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            await _productRepository.UpdateProductAsync(product);
        }

        public async Task DeleteProductAsync(int id)
        {
            await _productRepository.DeleteProductAsync(id);
        }
    }
}