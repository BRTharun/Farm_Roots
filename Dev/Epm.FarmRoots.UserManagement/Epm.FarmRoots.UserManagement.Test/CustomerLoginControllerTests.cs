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
    public class CustomerLoginControllerTests
    {
        private Mock<ICustomerLoginService>? _customerLoginServiceMock;
        private Mock<TokenService>? _tokenServiceMock;
        private CustomerLoginController? _controller;

        [TestInitialize]
        public void Setup()
        {
            _customerLoginServiceMock = new Mock<ICustomerLoginService>();

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

            _controller = new CustomerLoginController(_customerLoginServiceMock.Object, _tokenServiceMock.Object);
        }

        //[TestMethod]
        //public async Task Login_ValidCredentials_ReturnsOkWithToken()
        //{
        //    // Arrange
        //    var loginDto = new LoginDto { Email = "test@example.com", Password = "correctpassword" };
        //    var expectedToken = "testtoken";
        //    var customer = new LoginResponseDto { Email = loginDto.Email, Token = expectedToken };

        //    _customerLoginServiceMock?.Setup(service => service.LoginCustomerAsync(loginDto.Email, loginDto.Password))
        //        .ReturnsAsync(customer);

        //    // Act
        //    var result = await _controller.Login(loginDto);

        //    // Assert
        //    var okResult = result as OkObjectResult;
        //    Assert.IsNotNull(okResult, "Expected OkObjectResult");
        //    Assert.IsNotNull(okResult.Value, "OkObjectResult.Value is null");

        //    dynamic response = okResult.Value;
        //    Assert.IsNotNull(response.Token, "Response does not contain 'token'");
        //    Assert.AreEqual(expectedToken, response.token, "Token value mismatch");
        //}

        [TestMethod]
        public async Task Login_ValidCredentials_ReturnsOkWithToken()
        {
            // Arrange
            var loginDto = new LoginDto { Email = "test@example.com", Password = "correctpassword" };
            var expectedToken = "testtoken";
            var customer = new LoginResponseDto { Email = loginDto.Email, Token = expectedToken, Id = 1 };

            _customerLoginServiceMock?.Setup(service => service.LoginCustomerAsync(loginDto.Email, loginDto.Password))
                .ReturnsAsync(customer);

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
            Assert.IsTrue(response.ContainsKey("Id"), "Response does not contain 'Id'");
            Assert.AreEqual(1, Convert.ToInt32(response["Id"]), "Id value mismatch");
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
            _customerLoginServiceMock?
                .Setup(service => service.LoginCustomerAsync(loginDto.Email, loginDto.Password))
                .ThrowsAsync(new UnauthorizedAccessException("Invalid email or password."));

            // Act
            var result = await _controller!.Login(loginDto);

            // Assert
            var unauthorizedResult = result as UnauthorizedObjectResult;
            Assert.IsNotNull(unauthorizedResult);
            Assert.AreEqual(401, unauthorizedResult.StatusCode);
            Assert.AreEqual("Invalid email or password.", unauthorizedResult.Value);

            _customerLoginServiceMock?.Verify(service => service.LoginCustomerAsync(loginDto.Email, loginDto.Password), Times.Once);
        }

        [TestMethod]
        public async Task Login_NullCustomer_ReturnsUnauthorized()
        {
            // Arrange
            var loginDto = new LoginDto { Email = "test@example.com", Password = "Password123!" };

            _customerLoginServiceMock?.Setup(s => s.LoginCustomerAsync(loginDto.Email, loginDto.Password))
                         .ReturnsAsync((LoginResponseDto)null);

            // Act
            var result = await _controller.Login(loginDto);

            // Assert
            var unauthorizedResult = result as UnauthorizedObjectResult;
            Assert.IsNotNull(unauthorizedResult);
            Assert.AreEqual(401, unauthorizedResult.StatusCode);
            Assert.AreEqual("Invalid email or password.", unauthorizedResult.Value);

            _customerLoginServiceMock?.Verify(service => service.LoginCustomerAsync(loginDto.Email, loginDto.Password), Times.Once);
        }
    }
}