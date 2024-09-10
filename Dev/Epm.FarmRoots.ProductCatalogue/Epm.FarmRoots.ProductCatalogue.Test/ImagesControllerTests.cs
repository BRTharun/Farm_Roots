using Epm.FarmRoots.ProductCatalogue.API.Controllers;
using Epm.FarmRoots.ProductCatalogue.Application.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;


namespace Epm.FarmRoots.ProductCatalogue.Test
{
    [TestClass]
    public class ImagesControllerTests
    {
        private ImagesController _controller;
        private Mock<IImageService> _mockImageService;

        [TestInitialize]
        public void Setup()
        {
            _mockImageService = new Mock<IImageService>();
            _controller = new ImagesController(_mockImageService.Object);
        }

        [TestMethod]
        public async Task UploadImages_ShouldReturnBadRequest_WhenNoImagesProvided()
        {
            // Arrange
            var files = new List<IFormFile>();
            var productId = 123;

            // Act
            var result = await _controller.UploadImages(files, productId);

            // Assert
            var actionResult = result as BadRequestObjectResult;
            Assert.IsNotNull(actionResult);
            Assert.AreEqual(400, actionResult.StatusCode);
            Assert.AreEqual("No images selected for upload.", actionResult.Value);
        }

        [TestMethod]
        public async Task UploadImages_ShouldReturnCreated_WhenImagesAreUploadedSuccessfully()
        {
            // Arrange
            var fileMock = new Mock<IFormFile>();
            var fileName = "test.jpg";
            var contentType = "image/jpeg";
            var ms = new MemoryStream();
            var writer = new StreamWriter(ms);
            writer.Write("Test file content");
            writer.Flush();
            ms.Position = 0;

            fileMock.Setup(_ => _.OpenReadStream()).Returns(ms);
            fileMock.Setup(_ => _.FileName).Returns(fileName);
            fileMock.Setup(_ => _.Length).Returns(ms.Length);
            fileMock.Setup(_ => _.ContentType).Returns(contentType);

            var files = new List<IFormFile> { fileMock.Object };
            var productId = 123;

            var createdImage = new Images { ImagesId = 1, ImageData = new byte[0] };

            _mockImageService.Setup(service => service.AddImageAsync(It.IsAny<Images>()))
                .Returns(Task.CompletedTask);

            _mockImageService.Setup(service => service.GetImageByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(createdImage);

            // Act
            var result = await _controller.UploadImages(files, productId);

            // Assert
            var actionResult = result as CreatedAtActionResult;
            Assert.IsNotNull(actionResult);
            Assert.AreEqual(201, actionResult.StatusCode);
            Assert.AreEqual(nameof(ImagesController.GetImageById), actionResult.ActionName);
            Assert.IsInstanceOfType(actionResult.Value, typeof(List<Images>));
        }



        [TestMethod]
        public async Task GetImageById_ShouldReturnNotFound_WhenImageDoesNotExist()
        {
            // Arrange
            var imageId = 1;
            _mockImageService.Setup(service => service.GetImageByIdAsync(imageId)).ReturnsAsync((Images)null);

            // Act
            var result = await _controller.GetImageById(imageId);

            // Assert
            var actionResult = result as ActionResult<Images>;
            Assert.IsNotNull(actionResult);
            Assert.IsInstanceOfType(actionResult.Result, typeof(NotFoundResult));
        }

        [TestMethod]
        public async Task ViewImage_ShouldReturnFileResult_WhenImageExists()
        {
            // Arrange
            var imageId = 1;
            var image = new Images { ImageData = new byte[0] };
            _mockImageService.Setup(service => service.GetImageByIdAsync(imageId))
                .ReturnsAsync(image);

            // Act
            var result = await _controller.ViewImage(imageId);

            // Assert
            var fileResult = result as FileContentResult;
            Assert.IsNotNull(fileResult);
            Assert.AreEqual("image/jpeg", fileResult.ContentType);
            CollectionAssert.AreEqual(image.ImageData, fileResult.FileContents);
        }
    }

}
