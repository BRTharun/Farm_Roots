using AutoMapper;
using Epm.FarmRoots.ProductCatalogue.Application.Dtos;
using Epm.FarmRoots.ProductCatalogue.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;


namespace Epm.FarmRoots.ProductCatalogue.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductSearchController : ControllerBase
    {
        private readonly IProductSearchService _productSearchService;
        private readonly IMapper _mapper;

        public ProductSearchController(IProductSearchService productSearchService, IMapper mapper)
        {
            _productSearchService = productSearchService;
            _mapper = mapper;
        }

        [HttpGet("SearchByName/{name}")]
        public async Task<ActionResult<IEnumerable<CreateProductDto>>> SearchProductsByName(string name)
        {
            var products = await _productSearchService.SearchProductsByNameAsync(name);
            if (products == null || !products.Any())
            {
                return NotFound("No products matching the criteria.");
            }

            // Map domain entities to DTOs
            var productDtos = _mapper.Map<IEnumerable<CreateProductDto>>(products);
            return Ok(productDtos);
        }

        [HttpGet("VoiceSearch")]
        public async Task<ActionResult<IEnumerable<CreateProductDto>>> VoiceSearch([FromQuery] string query)
        {
            var products = await _productSearchService.SearchProductsByVoiceAsync(query);
            if (products == null || !products.Any())
            {
                return NotFound("No products matching the criteria.");
            }

            // Map domain entities to DTOs
            var productDtos = _mapper.Map<IEnumerable<CreateProductDto>>(products);
            return Ok(productDtos);
        }
    }
}