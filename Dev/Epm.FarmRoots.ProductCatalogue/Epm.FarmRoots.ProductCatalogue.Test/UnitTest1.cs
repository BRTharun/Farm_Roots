using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Epm.FarmRoots.ProductCatalogue.Application.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Application.Dtos;
using Epm.FarmRoots.ProductCatalogue.Api.Controllers;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace EPM.Farmroots.ProductCatalogue.Test
{
    [TestClass]
    public class ProductControllerTests
    {
        private readonly Mock<IProductService> _mockProductService;
        private readonly ProductController _productController;

        public ProductControllerTests()
        {
            _mockProductService = new Mock<IProductService>();
            _productController = new ProductController(_mockProductService.Object);
        }

        [TestMethod]
        public async Task GetAllProducts_ReturnsAllProducts()
        {
            // Arrange
            var products = new List<ProductDto>
            {
                new ProductDto { ProductId = 1, ProductName = "Apple" },
                new ProductDto { ProductId = 2, ProductName = "Banana" }
            };
            _mockProductService.Setup(service => service.GetAllProductsAsync()).ReturnsAsync(products);

            // Act
            var result = await _productController.GetAllProducts();

            // Assert
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var returnedProducts = okResult.Value as IEnumerable<ProductDto>;
            Assert.AreEqual(2, (returnedProducts as List<ProductDto>).Count);
            Assert.AreEqual("Apple", (returnedProducts as List<ProductDto>)[0].ProductName);
        }

        [TestMethod]
        public async Task GetProductById_ReturnsProduct_WhenProductExists()
        {
            // Arrange
            var product = new ProductDto { ProductId = 1, ProductName = "Apple" };
            _mockProductService.Setup(service => service.GetProductByIdAsync(1)).ReturnsAsync(product);

            // Act
            var result = await _productController.GetProductById(1);

            // Assert
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var returnedProduct = okResult.Value as ProductDto;
            Assert.AreEqual("Apple", returnedProduct.ProductName);
        }

        [TestMethod]
        public async Task GetProductById_ReturnsNotFound_WhenProductDoesNotExist()
        {
            // Arrange
            _mockProductService.Setup(service => service.GetProductByIdAsync(1)).ReturnsAsync((ProductDto)null);

            // Act
            var result = await _productController.GetProductById(1);

            // Assert
            var notFoundResult = result.Result as NotFoundResult;
            Assert.IsNotNull(notFoundResult);
        }
    }
}