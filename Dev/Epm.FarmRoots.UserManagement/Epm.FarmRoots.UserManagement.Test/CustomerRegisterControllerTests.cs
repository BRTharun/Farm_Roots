
using Epm.FarmRoots.UserManagement.API.Controllers;
using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace Epm.FarmRoots.UserManagement.Test
{
      [TestClass]
    public class CustomerRegisterControllerTests
    {

        private  Mock<ICustomerService> _mockCustomerService;
        private  CustomerController _customerController;

        [TestInitialize]
        public void Setup()
        {
            _mockCustomerService = new Mock<ICustomerService>();
            _customerController = new CustomerController(_mockCustomerService.Object);
        }

        [TestMethod]
        public async Task CustomerRegister_ReturnsOkResult_WithValidCustomer()
        {
            // Arrange
            var customerDto = new CustomerDto
            {
                Name = "John Doe",
                Email = "john@example.com",
                PhoneNumber = "1234567890",
                Password = "Password123!"
            };
            _mockCustomerService.Setup(x => x.RegisterCustomerAsync(It.IsAny<CustomerDto>()))
                .ReturnsAsync(customerDto);

            var result = await _customerController.CustomerRegister(customerDto);

            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public async Task CustomerRegister_ReturnsBadRequest_WhenModelStateIsInvalid()
        {
            // Arrange
            _customerController.ModelState.AddModelError("Email", "Email is required");
            var customerDto = new CustomerDto();

            // Act
            var result = await _customerController.CustomerRegister(customerDto);

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        [TestMethod]
        public async Task CustomerRegister_ThrowsException_WhenServiceThrowsException()
        {
            // Arrange
            var customerDto = new CustomerDto
            {
                Name = "Jake Doe",
                Email = "jake@example.com",
                PhoneNumber = "1122334455",
                Password = "Password123!"
            };
            _mockCustomerService.Setup(x => x.RegisterCustomerAsync(It.IsAny<CustomerDto>()))
                .ThrowsAsync(new System.Exception("Service exception"));

            // Act & Assert
            await Assert.ThrowsExceptionAsync<System.Exception>(() => _customerController.CustomerRegister(customerDto));
        }       

        [TestMethod]
        public async Task CustomerRegister_ReturnsNull_WhenGivenEmptyCustomerDto()
        {
            // Arrange
            var emptyCustomerDto = new CustomerDto
            {
                Name = "",
                Email = "",
                PhoneNumber = "",
                Password = ""
            };

            _mockCustomerService.Setup(x => x.RegisterCustomerAsync(It.Is<CustomerDto>(dto =>
                string.IsNullOrWhiteSpace(dto.Name) &&
                string.IsNullOrWhiteSpace(dto.Email) &&
                string.IsNullOrWhiteSpace(dto.PhoneNumber) &&
                string.IsNullOrWhiteSpace(dto.Password))))
                .ReturnsAsync((CustomerDto)null);

            // Act
            var result = await _customerController.CustomerRegister(emptyCustomerDto);

            // Assert
            Assert.IsNull((result as OkObjectResult)?.Value, "Expected result to be null for empty CustomerDto");
        }


        [TestMethod]
        public async Task CustomerRegister_ReturnsBadRequest_IfPhoneNumberIsInvalid()
        {
            // Arrange
            var customerDto = new CustomerDto
            {
                Name = "John Customer",
                Email = "john@consumer.com",
                PhoneNumber = "abcde67890",
                Password = "SecurePass!234"
            };
            _mockCustomerService.Setup(x => x.RegisterCustomerAsync(It.IsAny<CustomerDto>()))
                .ReturnsAsync(customerDto);

            // Act
            var result = await _customerController.CustomerRegister(customerDto);

            // Assert
            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult), "Expected BadRequest when phone number is invalid");
            var badRequestResult = result as BadRequestObjectResult;
            Assert.IsTrue(badRequestResult.Value.ToString().Contains("Invalid phone number"));
        }

    }
}
