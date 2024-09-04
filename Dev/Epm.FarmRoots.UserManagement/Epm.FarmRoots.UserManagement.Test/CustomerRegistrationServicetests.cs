using AutoMapper;
using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Epm.FarmRoots.UserManagement.Application.Services;
using Epm.FarmRoots.UserManagement.Core.Entities;
using Epm.FarmRoots.UserManagement.Core.Interfaces;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.UserManagement.Test
{
    public class CustomerRegistrationServicetests
    {
        private Mock<ICustomerRepository> _mockCustomerRepository;
        private Mock<IMapper> _mockMapper;
        private ICustomerService _customerService;

        [TestInitialize]
        public void Setup()
        {
            _mockCustomerRepository = new Mock<ICustomerRepository>();
            _mockMapper = new Mock<IMapper>();
            _customerService = new CustomerRegisterService(_mockCustomerRepository.Object, _mockMapper.Object);
        }

        [TestMethod]
        public async Task RegisterCustomer_WithValidCustomer_ShouldReturnRegisteredCustomer()
        {
            var customerDto = new CustomerDto
            {
                Name = "John Doe",
                Email = "john@example.com",
                PhoneNumber = "1234567890",
                Password = "Password123!"
            };

            var customer = new Customer
            {
                CustomerId = 1,
                Name = "John Doe",
                Email = "john@example.com",
                PhoneNumber = "1234567890",
                Password = "Password123!"
            };

            _mockMapper.Setup(m => m.Map<Customer>(customerDto)).Returns(customer);
            _mockCustomerRepository.Setup(repo => repo.RegisterCustomerAsync(It.IsAny<Customer>())).ReturnsAsync(customer);
            _mockMapper.Setup(m => m.Map<CustomerDto>(customer)).Returns(customerDto);

            var result = await _customerService.RegisterCustomerAsync(customerDto);
            Assert.IsNotNull(result);
            Assert.AreEqual("John Doe", result.Name);
            Assert.AreEqual("john@example.com", result.Email);
            _mockCustomerRepository.Verify(repo => repo.RegisterCustomerAsync(It.IsAny<Customer>()), Times.Once);
        }



        [TestMethod]
        public async Task RegisterCustomer_WithInvalidEmail_ShouldThrowException()
        {
            var customerDto = new CustomerDto
            {
                Name = "Jane Doe",
                Email = "invalidemail",
                PhoneNumber = "0987654321",
                Password = "Password123!"
            };

            _mockMapper.Setup(m => m.Map<Customer>(customerDto)).Throws(new Exception("Invalid email format"));
            var ex = await Assert.ThrowsExceptionAsync<Exception>(async () =>
            await _customerService.RegisterCustomerAsync(customerDto));
            Assert.AreEqual("Invalid email format", ex.Message);
        }


        [TestMethod]
        public async Task RegisterCustomer_WithDuplicateEmail_ShouldThrowException()
        {
            var customerDto = new CustomerDto
            {
                Name = "Jake Doe",
                Email = "jake@example.com",
                PhoneNumber = "1122334455",
                Password = "Password123!"
            };

            _mockMapper.Setup(m => m.Map<Customer>(customerDto)).Returns(new Customer());
            _mockCustomerRepository.Setup(repo => repo.RegisterCustomerAsync(It.IsAny<Customer>()))
                .ThrowsAsync(new Exception("Email already exists"));
            var ex = await Assert.ThrowsExceptionAsync<Exception>(() => _customerService.RegisterCustomerAsync(customerDto));
            Assert.AreEqual("Customer Registration Failed.", ex.Message);
        }


        [TestMethod]
        public async Task RegisterCustomer_RepositoryThrowsException_ShouldThrowException()
        {
            var customerDto = new CustomerDto
            {
                Name = "Jake Doe",
                Email = "jake@example.com",
                PhoneNumber = "1122334455",
                Password = "Password123!"
            };

            _mockMapper.Setup(m => m.Map<Customer>(customerDto)).Returns(new Customer());
            _mockCustomerRepository.Setup(repo => repo.RegisterCustomerAsync(It.IsAny<Customer>()))
                .ThrowsAsync(new Exception("Database error"));
            var ex = await Assert.ThrowsExceptionAsync<Exception>(() => _customerService.RegisterCustomerAsync(customerDto));
            Assert.AreEqual("Customer Registration Failed.", ex.Message);
        }

        [TestMethod]
        public async Task RegisterCustomer_WithNullCustomerDto_ShouldThrowArgumentNullException()
        {
            CustomerDto customerDto = null;
            var ex = await Assert.ThrowsExceptionAsync<ArgumentNullException>(() => _customerService.RegisterCustomerAsync(customerDto));
            Assert.AreEqual("customerDto", ex.ParamName);
            _mockCustomerRepository.Verify(repo => repo.RegisterCustomerAsync(It.IsAny<Customer>()), Times.Never);
        }


    }
}
