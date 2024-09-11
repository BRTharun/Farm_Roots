using Epm.FarmRoots.ProductCatalogue.API.Controllers;
using Epm.FarmRoots.ProductCatalogue.Application.Dtos;
using Epm.FarmRoots.ProductCatalogue.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPM.Farmroots.ProductCatalalogue.Test
{
    [TestClass]
    public class PriceControllerTests
    {
        private readonly Mock<IPriceService> _mockPriceService;
        private readonly PriceController _priceController;

        public PriceControllerTests()
        {
            _mockPriceService = new Mock<IPriceService>();
            _priceController = new PriceController(_mockPriceService.Object);
        }

        [TestMethod]
        public async Task GetAll_ShouldReturnAllPrices()
        {
            // Arrange
            var prices = new List<PriceDto> { new PriceDto { PriceId = 1, SalePrice = 100 } };
            _mockPriceService.Setup(service => service.GetAllPricesAsync()).ReturnsAsync(prices);

            // Act
            var result = await _priceController.GetAll();

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
            Assert.AreEqual(prices, okResult.Value);
        }

        [TestMethod]
        public async Task Get_ShouldReturnPriceById()
        {
            // Arrange
            var price = new PriceDto { PriceId = 1, SalePrice = 100 };
            _mockPriceService.Setup(service => service.GetPriceByIdAsync(It.IsAny<int>())).ReturnsAsync(price);

            // Act
            var result = await _priceController.Get(1, 1);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
            Assert.AreEqual(price, okResult.Value);
        }

        [TestMethod]
        public async Task Create_ShouldReturnCreatedPrice()
        {
            // Arrange
            var priceDto = new PriceDto { PriceId = 1, SalePrice = 100 };
            var returnTuple = (priceDto, (string)null);
            _mockPriceService.Setup(service => service.CreatePriceAsync(It.IsAny<PriceDto>())).ReturnsAsync(returnTuple);

            // Act
            var result = await _priceController.Create(priceDto);

            // Assert
            var createdAtActionResult = result as CreatedAtActionResult;
            Assert.IsNotNull(createdAtActionResult);
            Assert.AreEqual(201, createdAtActionResult.StatusCode);
            Assert.AreEqual(priceDto, createdAtActionResult.Value);
        }

        [TestMethod]
        public async Task Update_ShouldReturnNoContent()
        {
            // Arrange
            var priceDto = new PriceDto { PriceId = 1, SalePrice = 100 };
            _mockPriceService.Setup(service => service.UpdatePriceAsync(It.IsAny<PriceDto>())).ReturnsAsync((string)null);

            // Act
            var result = await _priceController.Update(1, priceDto);

            // Assert
            var noContentResult = result as NoContentResult;
            Assert.IsNotNull(noContentResult);
            Assert.AreEqual(204, noContentResult.StatusCode);
        }

        [TestMethod]
        public async Task Delete_ShouldReturnNoContent()
        {
            // Arrange
            _mockPriceService.Setup(service => service.DeletePriceAsync(It.IsAny<int>())).Returns(Task.CompletedTask);

            // Act
            var result = await _priceController.Delete(1);

            // Assert
            var noContentResult = result as NoContentResult;
            Assert.IsNotNull(noContentResult);
            Assert.AreEqual(204, noContentResult.StatusCode);
        }
    }
}