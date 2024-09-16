using Epm.FarmRoots.UserManagement.API.Controllers;
using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Epm.FarmRoots.UserManagement.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace Epm.FarmRoots.UserManagement.Test
{
    public class ChangePasswordTests
    {
        private  Mock<ICustomerService> _mockService;
        private Mock<ICustomerUpdateService> _mockUpdateService;
        private Mock<ICustomerAddressService> _mockcustomerAddressService;
        private CustomerController _controller;

        [TestInitialize]
        public void Setup()
        {
            _mockService = new Mock<ICustomerService>();
            _mockUpdateService = new Mock<ICustomerUpdateService>();
            _mockcustomerAddressService = new Mock<ICustomerAddressService>();
            _controller = new CustomerController(_mockService.Object, _mockUpdateService.Object, _mockcustomerAddressService.Object);
        }

        [TestMethod]
        public async Task ChangePassword_Successful()
        {
            // Arrange
            var customerId = 1;
            var model = new ChangePasswordModel { OldPassword = "oldPass", NewPassword = "newPass" };
            _mockService.Setup(s => s.ChangePasswordAsync(customerId, model.OldPassword, model.NewPassword)).ReturnsAsync(new CustomerDto{
                CustomerId = customerId,
                Name = "John Doe",
                Email = "john.doe@example.com",
                PhoneNumber = "1234567890",
                Password = "newPass"
            });

            // Act
            var result = await _controller.ChangePassword(customerId, model);

            // Assert
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
            var okResult = result as OkObjectResult;
            Assert.IsInstanceOfType(okResult.Value, typeof(CustomerDto));
        }

        [TestMethod]
        public async Task ChangePassword_NewPassword_Empty()
        {
            // Arrange
            var customerId = 1;
            var model = new ChangePasswordModel { OldPassword = "oldPass", NewPassword = "" };

            // Act
            var result = await _controller.ChangePassword(customerId, model);

            // Assert
            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        [TestMethod]
        public async Task ChangePassword_CustomerNotFound()
        {
            // Arrange
            var customerId = 1;
            var model = new ChangePasswordModel { OldPassword = "oldPass", NewPassword = "newPass" };
            _mockService.Setup(s => s.ChangePasswordAsync(customerId, model.OldPassword, model.NewPassword))
                        .ThrowsAsync(new KeyNotFoundException("Customer not found."));

            // Act
            var result = await _controller.ChangePassword(customerId, model);

            // Assert
            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        [TestMethod]
        public async Task ChangePassword_OldPassword_Incorrect()
        {
            // Arrange
            var customerId = 1;
            var model = new ChangePasswordModel { OldPassword = "oldPass", NewPassword = "newPass" };
            _mockService.Setup(s => s.ChangePasswordAsync(customerId, model.OldPassword, model.NewPassword))
                        .ThrowsAsync(new ArgumentException("The old password is incorrect."));

            // Act
            var result = await _controller.ChangePassword(customerId, model);

            // Assert
            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        [TestMethod]
        public async Task ChangePassword_UnhandledException()
        {
            // Arrange
            var customerId = 1;
            var model = new ChangePasswordModel { OldPassword = "oldPass", NewPassword = "newPass" };
            _mockService.Setup(s => s.ChangePasswordAsync(customerId, model.OldPassword, model.NewPassword))
                        .ThrowsAsync(new Exception("An error occurred"));

            // Act
            var result = await _controller.ChangePassword(customerId, model);

            // Assert
            Assert.IsInstanceOfType(result, typeof(ObjectResult));
            var objectResult = result as ObjectResult;
            Assert.AreEqual(500, objectResult.StatusCode);
        }
    }
}
