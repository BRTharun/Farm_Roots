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
    public class VendorLoginServiceTests
    {
        private Mock<IVendorRepository>? _vendorRepositoryMock;
        private Mock<TokenService>? _tokenServiceMock;
        private IMapper? _mapper;
        private IVendorLoginService? _service;

        [TestInitialize]
        public void Setup()
        {
            _vendorRepositoryMock = new Mock<IVendorRepository>();
            _tokenServiceMock = new Mock<TokenService>(Mock.Of<IConfiguration>());

            var config = new MapperConfiguration(cfg => cfg.CreateMap<Vendor, LoginResponseDto>());
            _mapper = config.CreateMapper();

            _service = new VendorLoginService(_vendorRepositoryMock.Object, _mapper, _tokenServiceMock.Object);
        }

        [TestMethod]
        public async Task LoginVendorAsync_VendorDoesNotExist_ThrowsUnauthorizedAccessException()
        {
            // Arrange
            _vendorRepositoryMock?.Setup(r => r.GetVendorByEmailAsync(It.IsAny<string>())).ReturnsAsync((Vendor)null);

            // Act & Assert
            await Assert.ThrowsExceptionAsync<UnauthorizedAccessException>(() =>
                _service.LoginVendorAsync("test@example.com", "password"));
        }

        [TestMethod]
        public async Task LoginVendorAsync_IncorrectPassword_ThrowsUnauthorizedAccessException()
        {
            // Arrange
            var vendor = new Vendor
            {
                Id = 1,
                Name = "John Doe",
                Email = "test@example.com",
                PhoneNumber = "123-456-7890",
                Password = "correctpassword"
            };
            _vendorRepositoryMock?.Setup(r => r.GetVendorByEmailAsync(It.IsAny<string>())).ReturnsAsync(vendor);

            // Act & Assert
            await Assert.ThrowsExceptionAsync<UnauthorizedAccessException>(() =>
                _service.LoginVendorAsync("test@example.com", "wrongpassword"));
        }

        [TestMethod]
        public async Task LoginVendorAsync_ValidCredentials_ReturnsLoginResponseDto()
        {
            // Arrange
            var vendor = new Vendor
            {
                Id = 1, // Assuming Id is also needed but not required
                Name = "John Doe",
                Email = "test@example.com",
                PhoneNumber = "123-456-7890",
                Password = "correctpassword"
            };
            var token = "testtoken";
            _vendorRepositoryMock?.Setup(r => r.GetVendorByEmailAsync(It.IsAny<string>())).ReturnsAsync(vendor);
            _tokenServiceMock?.Setup(t => t.GenerateToken(It.IsAny<string>(), It.IsAny<string>())).Returns(token);

            // Act
            var result = await _service.LoginVendorAsync(vendor.Email, vendor.Password);

            // Assert
            Assert.AreEqual(vendor.Email, result.Email);
            Assert.AreEqual(token, result.Token);
        }
    }
}
