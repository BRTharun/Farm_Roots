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
    public class VendorLoginServiceTests
    {
        private Mock<IVendorRepository>? _vendorRepositoryMock;
        private Mock<TokenService>? _tokenServiceMock;
        private IMapper? _mapper;
        private VendorLoginService _service;
        private Mock<IPasswordHasher<Vendor>>? _passwordHasherMock;

        [TestInitialize]
        public void Setup()
        {
            _vendorRepositoryMock = new Mock<IVendorRepository>();
            _tokenServiceMock = new Mock<TokenService>(Mock.Of<IConfiguration>());

            var config = new MapperConfiguration(cfg => cfg.CreateMap<Vendor, LoginResponseDto>());
            _mapper = config.CreateMapper();

            _passwordHasherMock = new Mock<IPasswordHasher<Vendor>>();
            _service = new VendorLoginService(_vendorRepositoryMock.Object, _mapper, _tokenServiceMock.Object, _passwordHasherMock.Object);
        }

        [TestMethod]
        public async Task LoginVendorAsync_VendorDoesNotExist_ThrowsUnauthorizedAccessException()
        {
            // Arrange
            _vendorRepositoryMock.Setup(r => r.GetVendorByEmailAsync(It.IsAny<string>())).ReturnsAsync((Vendor)null);

            // Act & Assert
            await Assert.ThrowsExceptionAsync<UnauthorizedAccessException>(() =>
                _service.LoginVendorAsync("vendor@example.com", "password"));
        }

        [TestMethod]
        public async Task LoginVendorAsync_IncorrectPassword_ThrowsUnauthorizedAccessException()
        {
            // Arrange
            var vendor = new Vendor
            {
                Id = 1,
                Name = "Vendor Doe",
                Email = "vendor@example.com",
                PhoneNumber = "9876543210",
                Password = "hashedCorrectPassword"
            };
            _vendorRepositoryMock.Setup(r => r.GetVendorByEmailAsync(It.IsAny<string>())).ReturnsAsync(vendor);
            _passwordHasherMock.Setup(ph => ph.VerifyHashedPassword(vendor, "wrongpassword", vendor.Password))
                               .Returns(PasswordVerificationResult.Failed);

            // Act & Assert
            await Assert.ThrowsExceptionAsync<UnauthorizedAccessException>(() =>
                _service.LoginVendorAsync("vendor@example.com", "wrongpassword"));
        }

        [TestMethod]
        public async Task LoginVendorAsync_ValidCredentials_ReturnsLoginResponseDto()
        {
            // Arrange
            var vendor = new Vendor
            {
                Id = 1,
                Name = "Vendor Doe",
                Email = "vendor@example.com",
                PhoneNumber = "9876543210",
                Password = "hashedCorrectPassword"
            };
            var token = "testtoken";
            _vendorRepositoryMock.Setup(r => r.GetVendorByEmailAsync(It.IsAny<string>())).ReturnsAsync(vendor);
            _passwordHasherMock.Setup(ph => ph.VerifyHashedPassword(
                    It.Is<Vendor>(v => v.Email == "vendor@example.com" && v.Password == "hashedCorrectPassword"),
                    "hashedCorrectPassword", "correctpassword"))
                    .Returns(PasswordVerificationResult.Success);
            _tokenServiceMock.Setup(t => t.GenerateToken(It.IsAny<string>(), It.IsAny<string>())).Returns(token);

            // Act
            var result = await _service.LoginVendorAsync("vendor@example.com", "correctpassword");

            // Assert
            Assert.AreEqual(vendor.Email, result.Email);
            Assert.AreEqual(token, result.Token);
        }
    }
}