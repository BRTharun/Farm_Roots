using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Epm.FarmRoots.ProductCatalogue.Api.Controllers;
using Epm.FarmRoots.ProductCatalogue.Application.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Application.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Epm.FarmRoots.ProductCatalogue.Test.Controllers
{
    [TestClass]
    public class ProductControllerTests
    {
        private Mock<IProductService> _mockProductService = new Mock<IProductService>();
        private ProductController _controller = null!;

        [TestInitialize]
        public void Setup()
        {
            _mockProductService = new Mock<IProductService>();
            _controller = new ProductController(_mockProductService.Object);
        }

        [TestMethod]
        public async Task GetAllProducts_ReturnsOkObjectResult_WithListOfProducts()
        {
            // Arrange
            var products = new List<ProductDto>
            {
                new ProductDto
                {
                    ProductId = 1,
                    ProductName = "Test Product",
                    ProductDescription = "Description",
                    ProductCategory = "Category",
                    ProductStock = 10,
                    ProductMrp = 100.0m,
                    ProductSale_Price = 90.0m,
                    ProductImage = new byte[0]
                }
            };
            _mockProductService.Setup(service => service.GetAllProductsAsync()).ReturnsAsync(products);

            // Act
            var result = await _controller.GetAllProducts();

            // Assert
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
            Assert.AreEqual(products, okResult.Value);
        }

        [TestMethod]
        public async Task AddProduct_ReturnsCreatedAtActionResult_WithProduct()
        {
            // Arrange
            var productDto = new ProductDto
            {
                ProductId = 1,
                ProductName = "New Product",
                ProductDescription = "Description",
                ProductCategory = "Category",
                ProductStock = 10,
                ProductMrp = 100.0m,
                ProductSale_Price = 90.0m,
                ProductImage = new byte[0]
            };
            _mockProductService.Setup(service => service.AddProductAsync(It.IsAny<ProductDto>())).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.AddProduct(productDto);

            // Assert
            var createdAtActionResult = result.Result as CreatedAtActionResult;
            Assert.IsNotNull(createdAtActionResult);
            Assert.AreEqual(201, createdAtActionResult.StatusCode);
            Assert.AreEqual("GetProductById", createdAtActionResult.ActionName);
            Assert.AreEqual(productDto, createdAtActionResult.Value);
        }
    }
}