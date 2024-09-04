using Epm.FarmRoots.IdentityService;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.UserManagement.Test
{
    [TestClass]
    public class TokenServiceTests
    {
        private TokenService _tokenService;
        private IConfiguration _configuration;

        [TestInitialize]
        public void Setup()
        {
            var inMemorySettings = new Dictionary<string, string> {
            {"Jwt:Key", "testkeytestkeytestkeyfortesting24nf95g"},
            {"Jwt:Issuer", "testissuer"},
            {"Jwt:Audience", "testaudience"}
        };

            _configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(inMemorySettings)
                .Build();

            _tokenService = new TokenService(_configuration);
        }

        [TestMethod]
        [ExpectedException(typeof(InvalidOperationException))]
        public void GenerateToken_MissingConfigurationValues_ThrowsException()
        {
            // Arrange
            var badConfiguration = new ConfigurationBuilder().Build(); // No JWT settings

            var tokenService = new TokenService(badConfiguration);

            // Act
            tokenService.GenerateToken("username", "role");
        }

        [TestMethod]
        public void GenerateToken_ValidConfiguration_GeneratesToken()
        {
            // Act
            var token = _tokenService.GenerateToken("username", "role");

            // Assert
            Assert.IsNotNull(token);
            Assert.IsTrue(token.Split('.').Length == 3); // Ensure it's a valid JWT
        }
    }

}
