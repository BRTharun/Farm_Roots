#pragma warning disable
using Epm.FarmRoots.UserManagement.API.Controllers;
using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.UserManagement.Test
{
    public class VendorRegistrationControllerTests
    {
        private Mock<IVendorService> _mockVendorService;
        private VendorController _vendorController;

        [TestInitialize]
        public void Setup()
        {
            _mockVendorService = new Mock<IVendorService>();
            _vendorController = new VendorController(_mockVendorService.Object);
        }

        [TestMethod]
        public async Task VendorRegister_ReturnsOkResult_WithValidVendor()
        {
            // Arrange
            var vendorDto = new VendorDto
            {
                Name = "John Vendor",
                Email = "john@vendor.com",
                PhoneNumber = "9876543210",
                Password = "StrongPassword123!"
            };
            _mockVendorService.Setup(x => x.RegisterVendorAsync(It.IsAny<VendorDto>()))
                .ReturnsAsync(vendorDto);

            // Act
            var result = await _vendorController.VendorRegister(vendorDto);

            // Assert
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public async Task VendorRegister_ReturnsBadRequest_WhenModelStateIsInvalid()
        {
            // Arrange
            _vendorController.ModelState.AddModelError("Email", "Email is required");
            var vendorDto = new VendorDto();

            // Act
            var result = await _vendorController.VendorRegister(vendorDto);

            // Assert
            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        [TestMethod]
        public async Task VendorRegister_ThrowsException_WhenServiceThrowsException()
        {
            // Arrange
            var vendorDto = new VendorDto
            {
                Name = "Vendor Exeption",
                Email = "vendor@exception.com",
                PhoneNumber = "9988776655",
                Password = "StrongPassword123!"
            };
            _mockVendorService.Setup(x => x.RegisterVendorAsync(It.IsAny<VendorDto>()))
                .ThrowsAsync(new System.Exception("Service exception"));

            // Act & Assert
            await Assert.ThrowsExceptionAsync<System.Exception>(() => _vendorController.VendorRegister(vendorDto));
        }

        [TestMethod]
        public async Task VendorRegister_ReturnsNull_WhenGivenEmptyVendorDto()
        {
            // Arrange
            var emptyVendorDto = new VendorDto
            {
                Name = "",
                Email = "",
                PhoneNumber = "",
                Password = ""
            };

            _mockVendorService.Setup(x => x.RegisterVendorAsync(It.Is<VendorDto>(dto =>
                string.IsNullOrWhiteSpace(dto.Name) &&
                string.IsNullOrWhiteSpace(dto.Email) &&
                string.IsNullOrWhiteSpace(dto.PhoneNumber) &&
                string.IsNullOrWhiteSpace(dto.Password))))
                .ReturnsAsync((VendorDto)null);

            // Act
            var result = await _vendorController.VendorRegister(emptyVendorDto);

            // Assert
            Assert.IsNull((result as OkObjectResult)?.Value, "Expected result to be null for empty VendorDto");
        }

        [TestMethod]
        public async Task VendorRegister_ReturnsBadRequest_IfPhoneNumberIsInvalid()
        {
            // Arrange
            var vendorDto = new VendorDto
            {
                Name = "Alice Vendor",
                Email = "alice@business.com",
                PhoneNumber = "abcde12345",
                Password = "StrongPassword123!"
            };
            _mockVendorService.Setup(x => x.RegisterVendorAsync(It.IsAny<VendorDto>()))
                .ReturnsAsync(vendorDto);

            // Act
            var result = await _vendorController.VendorRegister(vendorDto);

            // Assert
            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult), "Expected BadRequest when phone number is invalid");
            var badRequestResult = result as BadRequestObjectResult;
            Assert.IsTrue(badRequestResult.Value.ToString().Contains("Invalid phone number"));
        }
    }
}
