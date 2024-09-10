using Epm.FarmRoots.ProductCatalogue.Application.Dtos;
using Epm.FarmRoots.ProductCatalogue.Application.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Core.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using AutoMapper;

namespace Epm.FarmRoots.ProductCatalogue.Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductService(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ResponseProductDto>> GetAllProductsAsync()
        {
            return _mapper.Map<IEnumerable<ResponseProductDto>>(await _productRepository.GetAllAsync());
        }

        public async Task<ResponseProductDto> GetProductByIdAsync(int id)
        {
            return _mapper.Map<ResponseProductDto>(await _productRepository.GetByIdAsync(id));
        }

        public async Task<ResponseProductDto> CreateProductAsync(CreateProductDto product)
        {
            
            var prod= _mapper.Map<Product>(product);
            prod.CreatedOn = DateTime.Today;
            prod.UpdatedOn = DateTime.Today;
            await _productRepository.AddAsync(prod);
            return _mapper.Map<ResponseProductDto>(prod);
        }

        public async Task UpdateProductAsync(ResponseProductDto product)
        {
            await _productRepository.UpdateAsync(_mapper.Map<Product>(product));
        }

        public async Task DeleteProductAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product != null)
            {
                await _productRepository.DeleteAsync(product);
            }
        }
    }
}