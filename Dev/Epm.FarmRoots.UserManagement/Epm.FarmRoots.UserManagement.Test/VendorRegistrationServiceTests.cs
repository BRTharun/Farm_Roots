using AutoMapper;
using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Epm.FarmRoots.UserManagement.Application.Services;
using Epm.FarmRoots.UserManagement.Core.Entities;
using Epm.FarmRoots.UserManagement.Core.Interfaces;
using Moq;

namespace Epm.FarmRoots.UserManagement.Test
{
    public class VendorRegistrationServiceTests
    {

        private Mock<IVendorRepository>? _mockVendorRepository;
        private Mock<IMapper>? _mockMapper;
        private IVendorService? _vendorService;

        [TestInitialize]
        public void Setup()
        {
            _mockVendorRepository = new Mock<IVendorRepository>();
            _mockMapper = new Mock<IMapper>();
            _vendorService = new VendorRegisterService(_mockVendorRepository.Object, _mockMapper.Object);
        }

        [TestMethod]
        public async Task RegisterVendor_WithValidVendor_ShouldReturnRegisteredVendor()
        {
            var vendorDto = new VendorDto
            {
                Name = "John Vendor",
                Email = "johnvendor@example.com",
                PhoneNumber = "1234567890",
                Password = "Password123!"
            };

            var vendor = new Vendor
            {
                Id = 1,
                Name = "John Vendor",
                Email = "johnvendor@example.com",
                PhoneNumber = "1234567890",
                Password = "Password123!"
            };

            _mockMapper.Setup(m => m.Map<Vendor>(vendorDto)).Returns(vendor);
            _mockVendorRepository.Setup(repo => repo.RegisterVendorAsync(It.IsAny<Vendor>())).ReturnsAsync(vendor);
            _mockMapper.Setup(m => m.Map<VendorDto>(vendor)).Returns(vendorDto);

            var result = await _vendorService.RegisterVendorAsync(vendorDto);

            Assert.IsNotNull(result);
            Assert.AreEqual("John Vendor", result.Name);
            Assert.AreEqual("johnvendor@example.com", result.Email);
            _mockVendorRepository.Verify(repo => repo.RegisterVendorAsync(It.IsAny<Vendor>()), Times.Once);
        }

        [TestMethod]
        public async Task RegisterVendor_WithInvalidEmail_ShouldThrowException()
        {
            var vendorDto = new VendorDto
            {
                Name = "Jane Vendor",
                Email = "invalidemail",
                PhoneNumber = "0987654321",
                Password = "Password123!"
            };

            _mockMapper.Setup(m => m.Map<Vendor>(vendorDto)).Throws(new Exception("Invalid email format"));
            var ex = await Assert.ThrowsExceptionAsync<Exception>(async () =>
                await _vendorService.RegisterVendorAsync(vendorDto));
            Assert.AreEqual("Invalid email format", ex.Message);
        }

        [TestMethod]
        public async Task RegisterVendor_WithDuplicateEmail_ShouldThrowException()
        {
            var vendorDto = new VendorDto
            {
                Name = "Jake Vendor",
                Email = "jakevendor@example.com",
                PhoneNumber = "1122334455",
                Password = "Password123!"
            };

            _mockMapper.Setup(m => m.Map<Vendor>(vendorDto)).Returns(new Vendor());
            _mockVendorRepository.Setup(repo => repo.RegisterVendorAsync(It.IsAny<Vendor>()))
                .ThrowsAsync(new Exception("Email already exists"));
            var ex = await Assert.ThrowsExceptionAsync<Exception>(() => _vendorService.RegisterVendorAsync(vendorDto));
            Assert.AreEqual("Vendor Registration Failed.", ex.Message);
        }

        [TestMethod]
        public async Task RegisterVendor_RepositoryThrowsException_ShouldThrowException()
        {
            var vendorDto = new VendorDto
            {
                Name = "Jake Vendor",
                Email = "jakevendor@example.com",
                PhoneNumber = "1122334455",
                Password = "Password123!"
            };

            _mockMapper.Setup(m => m.Map<Vendor>(vendorDto)).Returns(new Vendor());
            _mockVendorRepository.Setup(repo => repo.RegisterVendorAsync(It.IsAny<Vendor>()))
                .ThrowsAsync(new Exception("Database error"));
            var ex = await Assert.ThrowsExceptionAsync<Exception>(() => _vendorService.RegisterVendorAsync(vendorDto));
            Assert.AreEqual("Vendor Registration Failed.", ex.Message);
        }

        [TestMethod]
        public async Task RegisterVendor_WithNullVendorDto_ShouldThrowArgumentNullException()
        {
            VendorDto vendorDto = null;
            var ex = await Assert.ThrowsExceptionAsync<ArgumentNullException>(() => _vendorService.RegisterVendorAsync(vendorDto));

            Assert.AreEqual("vendorDto", ex.ParamName);
            _mockVendorRepository.Verify(repo => repo.RegisterVendorAsync(It.IsAny<Vendor>()), Times.Never);
        }



    }
}
