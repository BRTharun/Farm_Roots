using AutoMapper;
using Epm.FarmRoots.IdentityService;
using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Epm.FarmRoots.UserManagement.Core.Entities;
using Epm.FarmRoots.UserManagement.Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Moq;

namespace Epm.FarmRoots.UserManagement.Test
{
    [TestClass]
    public class CustomerLoginServiceTests
    {
        private Mock<ICustomerRepository>? _customerRepositoryMock;
        private Mock<TokenService>? _tokenServiceMock;
        private IMapper? _mapper;
        private ICustomerLoginService? _service;

        [TestInitialize]
        public void Setup()
        {
            _customerRepositoryMock = new Mock<ICustomerRepository>();
            _tokenServiceMock = new Mock<TokenService>(Mock.Of<IConfiguration>());

            var config = new MapperConfiguration(cfg => cfg.CreateMap<Customer, LoginResponseDto>());
            _mapper = config.CreateMapper();

            _service = new CustomerLoginService(_customerRepositoryMock.Object, _mapper, _tokenServiceMock.Object);
        }

        [TestMethod]
        public async Task LoginCustomerAsync_CustomerDoesNotExist_ThrowsUnauthorizedAccessException()
        {
            // Arrange
            _customerRepositoryMock?.Setup(r => r.GetCustomerByEmailAsync(It.IsAny<string>())).ReturnsAsync((Customer)null);

            // Act & Assert
            await Assert.ThrowsExceptionAsync<UnauthorizedAccessException>(() =>
                _service.LoginCustomerAsync("test@example.com", "password"));
        }

        [TestMethod]
        public async Task LoginCustomerAsync_IncorrectPassword_ThrowsUnauthorizedAccessException()
        {
            // Arrange
            var customer = new Customer {
                CustomerId = 1,
                Name = "John Doe",
                Email = "test@example.com",
                PhoneNumber = "1234567890",
                Password = "correctpassword"
            };
            _customerRepositoryMock?.Setup(r => r.GetCustomerByEmailAsync(It.IsAny<string>())).ReturnsAsync(customer);

            // Act & Assert
            await Assert.ThrowsExceptionAsync<UnauthorizedAccessException>(() =>
                _service.LoginCustomerAsync("test@example.com", "wrongpassword"));
        }

        [TestMethod]
        public async Task LoginCustomerAsync_ValidCredentials_ReturnsLoginResponseDto()
        {
            // Arrange
            var customer = new Customer {
                CustomerId = 1,
                Name = "John Doe",
                Email = "test@example.com",
                PhoneNumber = "1234567890",
                Password = "correctpassword"
            };
            var token = "testtoken";
            _customerRepositoryMock?.Setup(r => r.GetCustomerByEmailAsync(It.IsAny<string>())).ReturnsAsync(customer);
            _tokenServiceMock?.Setup(t => t.GenerateToken(It.IsAny<string>(), It.IsAny<string>())).Returns(token);

            // Act
            var result = await _service.LoginCustomerAsync(customer.Email, customer.Password);

            // Assert
            Assert.AreEqual(customer.Email, result.Email);
            Assert.AreEqual(token, result.Token);
        }
    }

}
