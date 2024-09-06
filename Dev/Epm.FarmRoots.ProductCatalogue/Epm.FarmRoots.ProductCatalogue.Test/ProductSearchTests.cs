using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Epm.FarmRoots.ProductCatalogue.Core.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Application.Services;
using Epm.FarmRoots.ProductCatalogue.Application.Dtos;
using Epm.FarmRoots.ProductCatalogue.API.Controllers;
using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Epm.FarmRoots.ProductCatalogue.Test
{
    [TestClass]
    public class ProductSearchTests
    {
        private Mock<IProductSearchRepository>? _mockRepository;
        private Mock<IMapper>? _mockMapper;
        private ProductSearchService? _service;
        private ProductSearchController? _controller;

        [TestInitialize]
        public void Setup()
        {
            _mockRepository = new Mock<IProductSearchRepository>();
            _mockMapper = new Mock<IMapper>();
            _service = new ProductSearchService(_mockRepository.Object);
            _controller = new ProductSearchController(_service, _mockMapper.Object);
        }

        [TestMethod]
        public async Task SearchProductsByName_ReturnsProducts()
        {
            // Arrange
            var products = new List<Product>
            {
                new Product
                {
                ProductId = 1,
                ProductName = "Apple",
                ProductCategory = "Fruits",
                ProductDescription = "Fresh Apples",
                ProductStock = 100,
                ProductMrp = 1.50m,
                ProductSale_Price = 1.20m,
                ProductImage = new byte[] {}
                },

                new Product
                {
                ProductId = 2,
                ProductName = "Banana",
                ProductCategory = "Fruits",
                ProductDescription = "Organic Bananas",
                ProductStock = 150,
                ProductMrp = 0.50m,
                ProductSale_Price = 0.45m,
                ProductImage = new byte[] {} 
                }
            };

            var productDtos = new List<ProductDto>
            {
                new ProductDto
                {
                ProductId = 1,
                ProductName = "Apple",
                ProductCategory = "Fruits",
                ProductDescription = "Fresh Apples",
                ProductStock = 100,
                ProductMrp = 1.50m,
                ProductSale_Price = 1.20m,
                ProductImage = new byte[] {}
                },

                new ProductDto
                {
                ProductId = 2,
                ProductName = "Banana",
                ProductCategory = "Fruits",
                ProductDescription = "Organic Bananas",
                ProductStock = 150,
                ProductMrp = 0.50m,
                ProductSale_Price = 0.45m,
                ProductImage = new byte[] {} 
                }
            };

            _mockRepository!.Setup(repo => repo.SearchProductsAsync("Apple")).ReturnsAsync(products);
            _mockMapper!.Setup(mapper => mapper.Map<IEnumerable<ProductDto>>(products)).Returns(productDtos);

            // Act
            var actionResult = await _controller!.SearchProductsByName("Apple");

            // Assert
            Assert.IsNotNull(actionResult);
            var okResult = actionResult.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
            Assert.AreEqual(productDtos, okResult.Value);
        }

        [TestMethod]
        public async Task SearchProductsByName_NoResults()
        {
            // Arrange
            _mockRepository!.Setup(repo => repo.SearchProductsAsync("NonExistent")).ReturnsAsync([]);

            // Act
            var actionResult = await _controller!.SearchProductsByName("NonExistent");

            // Assert
            Assert.IsNotNull(actionResult);
            var notFoundResult = actionResult.Result as NotFoundObjectResult;
            Assert.IsNotNull(notFoundResult);
            Assert.AreEqual(404, notFoundResult.StatusCode);
            Assert.AreEqual("No products matching the criteria.", notFoundResult.Value);
        }

        [TestMethod]
        public async Task SearchProductsByVoice_ReturnsProducts()
        {
            // Arrange
            var products = new List<Product>
            {
                new Product
                {
                ProductId = 1,
                ProductName = "Apple",
                ProductCategory = "Fruits",
                ProductDescription = "Fresh Apples",
                ProductStock = 100,
                ProductMrp = 1.50m,
                ProductSale_Price = 1.20m,
                ProductImage = new byte[] {}
                }
            };

            var productDtos = new List<ProductDto>
            {
                new ProductDto
                {
                ProductId = 1,
                ProductName = "Apple",
                ProductCategory = "Fruits",
                ProductDescription = "Fresh Apples",
                ProductStock = 100,
                ProductMrp = 1.50m,
                ProductSale_Price = 1.20m,
                ProductImage = new byte[] {}
                }
            };

            _mockRepository!.Setup(repo => repo.SearchProductsAsync("Show me apples")).ReturnsAsync(products);
            _mockMapper!.Setup(mapper => mapper.Map<IEnumerable<ProductDto>>(products)).Returns(productDtos);

            // Act
            var actionResult = await _controller!.VoiceSearch("Show me apples");

            // Assert
            Assert.IsNotNull(actionResult);
            var okResult = actionResult.Result as OkObjectResult;
            Assert.IsNotNull(okResult, "Expected an OkObjectResult");
            Assert.AreEqual(200, okResult.StatusCode);
            Assert.AreEqual(productDtos, okResult.Value);
        }

        [TestMethod]
        public async Task SearchProductsByVoice_NoResults()
        {
            // Arrange
            _mockRepository!.Setup(repo => repo.SearchProductsAsync("NonExistent")).ReturnsAsync([]);

            // Act
            var actionResult = await _controller!.VoiceSearch("NonExistent");

            // Assert
            Assert.IsNotNull(actionResult);
            var notFoundResult = actionResult.Result as NotFoundObjectResult;
            Assert.IsNotNull(notFoundResult, "Expected a NotFoundObjectResult");
            Assert.AreEqual(404, notFoundResult.StatusCode);
            Assert.AreEqual("No products matching the criteria.", notFoundResult.Value);
        }
    }
}