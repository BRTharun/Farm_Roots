using AutoMapper;
using Epm.FarmRoots.IdentityService;
using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Core.Entities;
using Epm.FarmRoots.UserManagement.Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Moq;

namespace Epm.FarmRoots.UserManagement.Test
{
    [TestClass]
    public class CustomerLoginServiceTests
    {
        private Mock<ICustomerRepository> _customerRepositoryMock;
        private Mock<TokenService> _tokenServiceMock;
        private IMapper _mapper;
        private CustomerLoginService _service;
        private Mock<IPasswordHasher<Customer>> _passwordHasherMock;

        [TestInitialize]
        public void Setup()
        {
            _customerRepositoryMock = new Mock<ICustomerRepository>();
            _tokenServiceMock = new Mock<TokenService>(Mock.Of<IConfiguration>());

            var config = new MapperConfiguration(cfg => cfg.CreateMap<Customer, LoginResponseDto>());
            _mapper = config.CreateMapper();

            _passwordHasherMock = new Mock<IPasswordHasher<Customer>>();
            _service = new CustomerLoginService(_customerRepositoryMock.Object, _mapper, _tokenServiceMock.Object, _passwordHasherMock.Object);
        }

        [TestMethod]
        public async Task LoginCustomerAsync_CustomerDoesNotExist_ThrowsUnauthorizedAccessException()
        {
            // Arrange
            _customerRepositoryMock.Setup(r => r.GetCustomerByEmailAsync(It.IsAny<string>())).ReturnsAsync((Customer)null);

            // Act & Assert
            await Assert.ThrowsExceptionAsync<UnauthorizedAccessException>(() =>
                _service.LoginCustomerAsync("test@example.com", "password"));
        }

        [TestMethod]
        public async Task LoginCustomerAsync_IncorrectPassword_ThrowsUnauthorizedAccessException()
        {
            // Arrange
            var customer = new Customer
            {
                CustomerId = 1,
                Name = "John Doe",
                Email = "test@example.com",
                PhoneNumber = "1234567890",
                Password = "hashedCorrectPassword"
            };
            _customerRepositoryMock.Setup(r => r.GetCustomerByEmailAsync(It.IsAny<string>())).ReturnsAsync(customer);
            _passwordHasherMock.Setup(ph => ph.VerifyHashedPassword(customer, "wrongpassword", customer.Password))
                               .Returns(PasswordVerificationResult.Failed);

            // Act & Assert
            await Assert.ThrowsExceptionAsync<UnauthorizedAccessException>(() =>
                _service.LoginCustomerAsync("test@example.com", "wrongpassword"));
        }

        [TestMethod]
        public async Task LoginCustomerAsync_ValidCredentials_ReturnsLoginResponseDto()
        {
            // Arrange
            var customer = new Customer
            {
                CustomerId = 1,
                Name = "John Doe",
                Email = "test@example.com",
                PhoneNumber = "1234567890",
                Password = "hashedCorrectPassword"
            };
            var token = "testtoken";
            _customerRepositoryMock.Setup(r => r.GetCustomerByEmailAsync(It.IsAny<string>())).ReturnsAsync(customer);
            //_passwordHasherMock.Setup(ph => ph.VerifyHashedPassword(customer, "correctpassword", customer.Password))
            //                   .Returns(PasswordVerificationResult.Success);
            _passwordHasherMock.Setup(ph => ph.VerifyHashedPassword(
                    It.Is<Customer>(c => c.Email == "test@example.com" && c.Password == "hashedCorrectPassword"),
                    "hashedCorrectPassword","correctpassword"))
                    .Returns(PasswordVerificationResult.Success);
            _tokenServiceMock.Setup(t => t.GenerateToken(It.IsAny<string>(), It.IsAny<string>())).Returns(token);

            // Act
            var result = await _service.LoginCustomerAsync("test@example.com", "correctpassword");

            // Assert
            Assert.AreEqual(customer.Email, result.Email);
            Assert.AreEqual(token, result.Token);
        }
    }
}