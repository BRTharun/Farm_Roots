using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Epm.FarmRoots.ProductCatalogue.Api.Controllers;
using Epm.FarmRoots.ProductCatalogue.Application.Dtos;
using Epm.FarmRoots.ProductCatalogue.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace Epm.FarmRoots.ProductCatalogue.Test
{
    [TestClass]
    public class ProductsControllerTests
    {
        private Mock<IProductService> _mockProductService;
        private ProductsController _controller;

        [TestInitialize]
        public void Initialize()
        {
            _mockProductService = new Mock<IProductService>();
            _controller = new ProductsController(_mockProductService.Object);
        }

        [TestMethod]
        public async Task GetAllProducts_ReturnsOkResult()
        {
            // Arrange
            var products = new List<ResponseProductDto>
            {
                new ResponseProductDto { ProductId = 1, ProductName = "Product 1", Published = true, ShortDescription = "Product 1" },
                new ResponseProductDto { ProductId = 2, ProductName = "Product 2", Published = true, ShortDescription = "Product 2" }
            };
            _mockProductService.Setup(service => service.GetAllProductsAsync()).ReturnsAsync(products);

            // Act
            var result = await _controller.GetAllProducts();

            // Assert
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
            var okResult = (OkObjectResult)result;
            Assert.IsInstanceOfType(okResult.Value, typeof(List<ResponseProductDto>));
            Assert.AreEqual(products.Count, ((List<ResponseProductDto>)okResult.Value).Count);
        }

        [TestMethod]
        public async Task GetProductById_WithExistingId_ReturnsOkResult()
        {
            // Arrange
            var productId = 1;
            var product = new ResponseProductDto { ProductId = productId, ProductName = "Product 1", Published = true, ShortDescription = "Product 1" };
            _mockProductService.Setup(service => service.GetProductByIdAsync(productId)).ReturnsAsync(product);

            // Act
            var result = await _controller.GetProductById(productId);

            // Assert
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
            var okResult = (OkObjectResult)result;
            Assert.IsInstanceOfType(okResult.Value, typeof(ResponseProductDto));
            Assert.AreEqual(productId, ((ResponseProductDto)okResult.Value).ProductId);
        }

        [TestMethod]
        public async Task GetProductById_WithNonExistingId_ReturnsNotFoundResult()
        {
            // Arrange
            var productId = 1;
            _mockProductService.Setup(service => service.GetProductByIdAsync(productId)).ReturnsAsync((ResponseProductDto)null);

            // Act
            var result = await _controller.GetProductById(productId);

            // Assert
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        [TestMethod]
        public async Task CreateProduct_WithValidData_ReturnsCreatedResult()
        {
            // Arrange
            var createProductDto = new CreateProductDto
            {
                ProductName = "New Product",
                ShortDescription = "Short description",
                Published = true,
                VendorId = 1,
                ProductType = "Simple product",
                ProductCondition = "New"
            };
            var createdProduct = new ResponseProductDto
            {
                ProductId = 1,
                ProductName = "New Product",
                ShortDescription = "Short description",
                Published = true,
                VendorId = 1,
                ProductCondition = "New"
            };
            _mockProductService.Setup(service => service.CreateProductAsync(createProductDto)).ReturnsAsync(createdProduct);

            // Act
            var result = await _controller.CreateProduct(createProductDto);

            // Assert
            Assert.IsInstanceOfType(result, typeof(ObjectResult));
            var objectResult = (ObjectResult)result;
            Assert.AreEqual(201, objectResult.StatusCode);
            Assert.IsInstanceOfType(objectResult.Value, typeof(ResponseProductDto));
            var createdProductResult = (ResponseProductDto)objectResult.Value;
            Assert.AreEqual(createdProduct.ProductId, createdProductResult.ProductId);
            Assert.AreEqual(createdProduct.ProductName, createdProductResult.ProductName);
            Assert.AreEqual(createdProduct.ShortDescription, createdProductResult.ShortDescription);
            Assert.AreEqual(createdProduct.Published, createdProductResult.Published);
            Assert.AreEqual(createdProduct.VendorId, createdProductResult.VendorId);
        }

        [TestMethod]
        public async Task CreateProduct_WithInvalidData_ReturnsBadRequestResult()
        {
            // Arrange
            var createProductDto = new CreateProductDto
            {
                ProductName = "",
                ShortDescription = "Short description",
                Published = true,
                VendorId = 1
            };
            _controller.ModelState.AddModelError("ProductName", "Product name is required.");

            // Act
            var result = await _controller.CreateProduct(createProductDto);

            // Assert
            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        [TestMethod]
        public async Task UpdateProduct_WithValidData_ReturnsNoContentResult()
        {
            // Arrange
            var productId = 1;
            var updateProductDto = new ResponseProductDto
            {
                ProductId = productId,
                ProductName = "Updated Product",
                ShortDescription = "Updated description",
                Published = true,
                VendorId = 1
            };
            _mockProductService.Setup(service => service.UpdateProductAsync(updateProductDto)).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.UpdateProduct(productId, updateProductDto);

            // Assert
            Assert.IsInstanceOfType(result, typeof(ObjectResult));
        }

        [TestMethod]
        public async Task UpdateProduct_WithMismatchedId_ReturnsBadRequestResult()
        {
            // Arrange
            var productId = 1;
            var updateProductDto = new ResponseProductDto
            {
                ProductId = 2,
                ProductName = "Updated Product",
                ShortDescription = "Updated description",
                Published = true,
                VendorId = 1
            };

            // Act
            var result = await _controller.UpdateProduct(productId, updateProductDto);

            // Assert
            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        [TestMethod]
        public async Task DeleteProduct_WithExistingId_ReturnsNoContentResult()
        {
            // Arrange
            var productId = 1;
            _mockProductService.Setup(service => service.DeleteProductAsync(productId)).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.DeleteProduct(productId);

            // Assert
            Assert.IsInstanceOfType(result, typeof(NoContentResult));
        }
    }
}
