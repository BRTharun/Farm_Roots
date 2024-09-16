using Microsoft.AspNetCore.Mvc;
using Epm.FarmRoots.ProductCatalogue.Application.Dtos;
using Epm.FarmRoots.ProductCatalogue.Application.Interfaces;

namespace Epm.FarmRoots.ProductCatalogue.Api.Controllers
{
    [ApiController]
    [Route("api/FarmRoots/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null) return NotFound();
            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] CreateProductDto product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                if (product == null)
                {
                    return StatusCode(500, "Failed to create the product Product is Null.");
                }

                if (product.ProductType != "Simple product" && product.ProductType != "Bundled product")
                {
                    return StatusCode(500, "Product Type Can be Simple product or Bundled product Only.");
                }

                if (product.ProductName is null)
                {
                    return StatusCode(500, "Product Name cant be Null");
                }
                else
                {
                    if (product.ProductName.Length > 15)
                    {
                        return StatusCode(500, "Product Name cant exceed 15 characters");
                    }
                    else
                    {
                        if (!product.ProductName.All(c => char.IsLetter(c) || char.IsWhiteSpace(c)))
                        {
                            return StatusCode(500, "Product Name can only contain alphabets");
                        }
                    }
                }

                if (product.ShortDescription == null)
                {
                    return StatusCode(500, "Short Description cant be Null");
                }
                else
                {
                    if (product.ShortDescription.Length > 50)
                    {
                        return StatusCode(500, "Short Description cant exceed 50 characters");
                    }
                }

                if (product.FullDescription != null && product.FullDescription.Length > 500)
                {
                    return StatusCode(500, "Full Description cant exceed 500 characters");
                }

                if (product.ProductCondition != "New" && product.ProductCondition != "Refurbished" && product.ProductCondition != "Used")
                {
                    return StatusCode(500, "Product Type Can be New or Refurbished or Used Only.");
                }
                var createdProd = await _productService.CreateProductAsync(product);
                return CreatedAtAction(nameof(GetProductById), new { id = createdProd.ProductId }, createdProd);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "A server error occurred while creating the product.");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] ResponseProductDto product)
        {
            if (id != product.ProductId)
                return BadRequest("Product ID mismatch");
            try
            {
                if (product.ProductType != "Simple product" && product.ProductType != "Bundled product")
                {
                    return StatusCode(500, "Product Type Can be Simple product or Bundled product Only.");
                }

                if (product.ProductName is null)
                {
                    return StatusCode(500, "Product Name cant be Null");
                }
                else
                {
                    if (product.ProductName.Length > 15)
                    {
                        return StatusCode(500, "Product Name cant exceed 15 characters");
                    }
                    else
                    {
                        if (!product.ProductName.All(c => char.IsLetter(c) || char.IsWhiteSpace(c)))
                        {
                            return StatusCode(500, "Product Name can only contain alphabets");
                        }
                    }
                }

                if (product.ShortDescription == null)
                {
                    return StatusCode(500, "Short Description cant be Null");
                }
                else
                {
                    if (product.ShortDescription.Length > 50)
                    {
                        return StatusCode(500, "Short Description cant exceed 50 characters");
                    }
                }

                if (product.FullDescription != null && product.FullDescription.Length > 500)
                {
                    return StatusCode(500, "Full Description cant exceed 500 characters");
                }

                if (product.ProductCondition != "New" && product.ProductCondition != "Refurbished" && product.ProductCondition != "Used")
                {
                    return StatusCode(500, "Product Type Can be New or Refurbished or Used Only.");
                }

                await _productService.UpdateProductAsync(product);
                return Ok(product);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "A server error occurred while updating the product.");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await GetProductById(id);
            if (product == null)
            {
                return NotFound("Product Not Found");
            }
            await _productService.DeleteProductAsync(id);
            return NoContent();
        }
    }
}
