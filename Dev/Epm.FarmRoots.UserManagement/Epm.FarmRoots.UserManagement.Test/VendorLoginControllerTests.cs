using Epm.FarmRoots.UserManagement.API.Controllers;
using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Microsoft.Extensions.Configuration;
using Epm.FarmRoots.IdentityService;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Newtonsoft.Json;

namespace Epm.FarmRoots.UserManagement.Test
{
    [TestClass]
    public class VendorLoginControllerTests
    {
        private Mock<IVendorLoginService>? _vendorLoginServiceMock;
        private Mock<TokenService>? _tokenServiceMock;
        private VendorLoginController? _controller;

        [TestInitialize]
        public void Setup()
        {
            _vendorLoginServiceMock = new Mock<IVendorLoginService>();

            var inMemorySettings = new Dictionary<string, string>
            {
                {"Jwt:Key", "testkeytestkeytestkeytestkeytestkeytestkeytestkeytestkey"},
                {"Jwt:Issuer", "testissuer"},
                {"Jwt:Audience", "testaudience"}
            };

            var configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(inMemorySettings)
                .Build();

            _tokenServiceMock = new Mock<TokenService>(configuration);
            _tokenServiceMock.Setup(service => service.GenerateToken(It.IsAny<string>(), It.IsAny<string>()))
                             .Returns("testtoken");

            _controller = new VendorLoginController(_vendorLoginServiceMock.Object, _tokenServiceMock.Object);
        }

        [TestMethod]
        public async Task Login_ValidCredentials_ReturnsOkWithToken()
        {
            // Arrange
            var loginDto = new LoginDto { Email = "test@example.com", Password = "correctpassword" };
            var expectedToken = "testtoken";
            var vendor = new LoginResponseDto { Email = loginDto.Email, Token = expectedToken };

            _vendorLoginServiceMock?.Setup(service => service.LoginVendorAsync(loginDto.Email, loginDto.Password))
                .ReturnsAsync(vendor);

            // Act
            var result = await _controller.Login(loginDto);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult, "Expected OkObjectResult");
            Assert.IsNotNull(okResult.Value, "OkObjectResult.Value is null");

            // Serialize and deserialize the result to a dictionary
            var json = JsonConvert.SerializeObject(okResult.Value);
            var response = JsonConvert.DeserializeObject<Dictionary<string, object>>(json);

            // Check the values
            Assert.IsTrue(response.ContainsKey("Token"), "Response does not contain 'Token'");
            Assert.AreEqual(expectedToken, response["Token"].ToString(), "Token value mismatch");
        }

        [TestMethod]
        public async Task Login_InvalidModelState_ReturnsBadRequest()
        {
            // Arrange
            var loginDto = new LoginDto { Email = "invalid-email", Password = "" };
            _controller?.ModelState.AddModelError("Email", "Invalid email format");
            _controller?.ModelState.AddModelError("Password", "Password is required");

            // Act
            var result = await _controller.Login(loginDto);

            // Assert
            var badRequestResult = result as BadRequestObjectResult;
            Assert.IsNotNull(badRequestResult);
            Assert.AreEqual(400, badRequestResult.StatusCode);

            var modelState = badRequestResult.Value as SerializableError;
            Assert.IsNotNull(modelState);
            Assert.IsTrue(modelState.ContainsKey("Email"));
            Assert.IsTrue(modelState.ContainsKey("Password"));
        }

        [TestMethod]
        public async Task Login_InvalidCredentials_ReturnsUnauthorized()
        {
            // Arrange
            var loginDto = new LoginDto { Email = "test@example.com", Password = "WrongPassword" };
            _vendorLoginServiceMock?
                .Setup(service => service.LoginVendorAsync(loginDto.Email, loginDto.Password))
                .ThrowsAsync(new UnauthorizedAccessException("Invalid email or password."));

            // Act
            var result = await _controller!.Login(loginDto);

            // Assert
            var unauthorizedResult = result as UnauthorizedObjectResult;
            Assert.IsNotNull(unauthorizedResult);
            Assert.AreEqual(401, unauthorizedResult.StatusCode);
            Assert.AreEqual("Invalid email or password.", unauthorizedResult.Value);

            _vendorLoginServiceMock?.Verify(service => service.LoginVendorAsync(loginDto.Email, loginDto.Password), Times.Once);
        }

        [TestMethod]
        public async Task Login_NullVendor_ReturnsUnauthorized()
        {
            // Arrange
            var loginDto = new LoginDto { Email = "test@example.com", Password = "Password123!" };

            _vendorLoginServiceMock?.Setup(s => s.LoginVendorAsync(loginDto.Email, loginDto.Password))
                         .ReturnsAsync((LoginResponseDto)null);

            // Act
            var result = await _controller.Login(loginDto);

            // Assert
            var unauthorizedResult = result as UnauthorizedObjectResult;
            Assert.IsNotNull(unauthorizedResult);
            Assert.AreEqual(401, unauthorizedResult.StatusCode);
            Assert.AreEqual("Invalid email or password.", unauthorizedResult.Value);

            _vendorLoginServiceMock?.Verify(service => service.LoginVendorAsync(loginDto.Email, loginDto.Password), Times.Once);
        }
    }
}
