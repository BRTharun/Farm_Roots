using Microsoft.AspNetCore.Mvc;
using Epm.FarmRoots.ProductCatalogue.Application.Dtos;
using Epm.FarmRoots.ProductCatalogue.Application.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epm.FarmRoots.ProductCatalogue.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        // GET: api/Product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetAllProducts()
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProductById(int id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        // POST: api/Product
        [HttpPost]
        public async Task<ActionResult<ProductDto>> AddProduct([FromBody] ProductDto productDto)
        {
            await _productService.AddProductAsync(productDto);
            return CreatedAtAction(nameof(GetProductById), new { id = productDto.ProductId }, productDto);
        }

        // PUT: api/Product/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] ProductDto productDto)
        {
            if (id != productDto.ProductId)
            {
                return BadRequest("Product ID mismatch");
            }

            await _productService.UpdateProductAsync(productDto);
            return NoContent();
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            await _productService.DeleteProductAsync(id);
            return NoContent();
        }
    }
}