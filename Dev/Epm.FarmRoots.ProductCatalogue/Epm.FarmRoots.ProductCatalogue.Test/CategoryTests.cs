using Microsoft.EntityFrameworkCore;
using Moq;
using Epm.FarmRoots.ProductCatalogue.Application.Dtos;
using Epm.FarmRoots.ProductCatalogue.Application.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Epm.FarmRoots.ProductCatalogue.Infrastructure.Data;
using Epm.FarmRoots.ProductCatalogue.Infrastructure.Repositories;

namespace Epm.FarmRoots.ProductCatalogue.Tests
{
    [TestClass]
    public class CategoryTests
    {
        private Mock<ISubCategoryService> _mockSubCategoryService;
        private Mock<ICategoryService> _mockCategoryService;
        private SubCategoryRepo _subCategoryRepo;
        private CategoryRepo _categoryRepo;
        private Mock<IServiceProvider> _mockServiceProvider;
        private ProductDbContext _dbContext;

        [TestInitialize]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ProductDbContext>()
                .UseInMemoryDatabase(databaseName: "ProductCatalogueDb")
                .Options;
            _dbContext = new ProductDbContext(options);

            _mockServiceProvider = new Mock<IServiceProvider>();
            _subCategoryRepo = new SubCategoryRepo(_dbContext, _mockServiceProvider.Object);
            _categoryRepo = new CategoryRepo(_dbContext, _mockServiceProvider.Object);
            _mockSubCategoryService = new Mock<ISubCategoryService>();
            _mockCategoryService = new Mock<ICategoryService>();
        }

        [TestMethod]
        public async Task AddSubCategoryAsync_ShouldAddSubCategory()
        {
            var subCategory = new SubCategory { SubCategoryId = 1, SubCategoryName = "Smartphones", CategoryId = 1 };
            await _subCategoryRepo.AddSubCategoryAsync(subCategory);

            var result = await _dbContext.SubCategory.FirstOrDefaultAsync(sc => sc.SubCategoryId == 1);
            Assert.IsNotNull(result);
            Assert.AreEqual("Smartphones", result.SubCategoryName);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public async Task AddSubCategoryAsync_ShouldThrowArgumentNullExceptionForNullSubCategory()
        {
            await _subCategoryRepo.AddSubCategoryAsync(null);
        }

        [TestMethod]
        public async Task GetSubCategoryByIdAsync_ShouldReturnSubCategory()
        {
            _dbContext.SubCategory.Add(new SubCategory { SubCategoryId = 1, SubCategoryName = "Smartphones", CategoryId = 1 });
            _dbContext.SaveChanges();

            var result = await _subCategoryRepo.GetSubCategoryByIdAsync(1);
            Assert.IsNotNull(result);
            Assert.AreEqual("Smartphones", result.SubCategoryName);
        }

        [TestMethod]
        [ExpectedException(typeof(KeyNotFoundException))]
        public async Task GetSubCategoryByIdAsync_ShouldThrowKeyNotFoundExceptionForInvalidId()
        {
            await _subCategoryRepo.GetSubCategoryByIdAsync(999);
        }

        [TestMethod]
        public async Task GetAllCategoriesAsync_ShouldReturnAllCategories()
        {
            _dbContext.Category.AddRange(new Category { CategoryId = 1, CategoryName = "Electronics" },
                                           new Category { CategoryId = 2, CategoryName = "Clothing" });
            _dbContext.SaveChanges();

            var result = await _categoryRepo.GetAllCategoriesAsync();
            Assert.AreEqual(2, result.Count);
            Assert.IsTrue(result.Any(c => c.CategoryName == "Electronics"));
            Assert.IsTrue(result.Any(c => c.CategoryName == "Clothing"));
        }

        [TestMethod]
        public async Task GetSubcategoriesByCategoryIdAsync_ShouldReturnSubCategories()
        {
            _dbContext.SubCategory.AddRange(new SubCategory { SubCategoryId = 1, SubCategoryName = "Smartphones", CategoryId = 1 },
                                              new SubCategory { SubCategoryId = 2, SubCategoryName = "Tablets", CategoryId = 1 });
            _dbContext.SaveChanges();

            var result = await _categoryRepo.GetSubcategoriesByCategoryIdAsync(1);
            Assert.AreEqual(2, result.Count());
            Assert.IsTrue(result.Any(sc => sc.SubCategoryName == "Smartphones"));
            Assert.IsTrue(result.Any(sc => sc.SubCategoryName == "Tablets"));
        }

        [TestMethod]
        public async Task GetAllSubCategoriesAsync_ShouldReturnAllSubCategories()
        {
            _dbContext.SubCategory.AddRange(new SubCategory { SubCategoryId = 1, SubCategoryName = "Smartphones", CategoryId = 1 },
                                              new SubCategory { SubCategoryId = 2, SubCategoryName = "Tablets", CategoryId = 1 });
            _dbContext.SaveChanges();

            var result = await _subCategoryRepo.GetAllSubCategoriesAsync();
            Assert.AreEqual(2, result.Count());
            Assert.IsTrue(result.Any(sc => sc.SubCategoryName == "Smartphones"));
            Assert.IsTrue(result.Any(sc => sc.SubCategoryName == "Tablets"));
        }

        [TestMethod]
        public async Task UpdateSubCategoryAsync_ShouldUpdateSubCategory()
        {
            var subCategory = new SubCategory { SubCategoryId = 1, SubCategoryName = "Smartphones", CategoryId = 1 };
            _dbContext.SubCategory.Add(subCategory);
            _dbContext.SaveChanges();

            subCategory.SubCategoryName = "Updated Name";
            await _subCategoryRepo.UpdateSubCategoryAsync(subCategory);

            var updatedSubCategory = await _dbContext.SubCategory.FindAsync(1);
            Assert.AreEqual("Updated Name", updatedSubCategory.SubCategoryName);
        }
        [TestMethod]
        public async Task GetCustomerProductsBySubCategoryId_WithValidId_ShouldReturnCustomerProducts()
        {
            // Arrange
            var subCategoryId = 1;
            var customerProducts = new List<CustomerProductViewDto>
            {
                new CustomerProductViewDto { ProductName = "Valencia Oranges", Price = 4.50m, ImageUrl = "http://example.com/oranges.jpg", ShortDescription = "Juicy Valencia oranges perfect for juicing" }
            };
            _mockSubCategoryService.Setup(service => service.GetCustomerProductsBySubCategoryIdAsync(subCategoryId))
                                   .ReturnsAsync(customerProducts);

            // Act
            var result = await _mockSubCategoryService.Object.GetCustomerProductsBySubCategoryIdAsync(subCategoryId);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Count());
            Assert.AreEqual("Valencia Oranges", result.First().ProductName);
        }

        [TestMethod]
        public async Task GetCustomerProductsByCategoryId_WithValidId_ShouldReturnCustomerProducts()
        {
            // Arrange
            var categoryId = 1;
            var customerProducts = new List<CustomerProductViewDto>
            {
                new CustomerProductViewDto { ProductName = "Organic Apples", Price = 3.99m, ImageUrl = "http://example.com/apples.jpg", ShortDescription = "Fresh organic apples from local farms" }
            };
            _mockCategoryService.Setup(service => service.GetCustomerProductsByCategoryIdAsync(categoryId))
                                .ReturnsAsync(customerProducts);

            // Act
            var result = await _mockCategoryService.Object.GetCustomerProductsByCategoryIdAsync(categoryId);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Count());
            Assert.AreEqual("Organic Apples", result.First().ProductName);
        }


        [TestMethod]
        public async Task GetCustomerProductsBySubCategoryId_WithNoProducts_ShouldReturnEmptyList()
        {
            // Arrange
            var subCategoryId = 2; 
            _mockSubCategoryService.Setup(service => service.GetCustomerProductsBySubCategoryIdAsync(subCategoryId))
                                   .ReturnsAsync(new List<CustomerProductViewDto>());

            // Act
            var result = await _mockSubCategoryService.Object.GetCustomerProductsBySubCategoryIdAsync(subCategoryId);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(0, result.Count()); // Use Count() method here
        }

        [TestMethod]
        public async Task GetCustomerProductsByCategoryId_WithNoProducts_ShouldReturnEmptyList()
        {
            // Arrange
            var categoryId = 2;
            _mockCategoryService.Setup(service => service.GetCustomerProductsByCategoryIdAsync(categoryId))
                                .ReturnsAsync(new List<CustomerProductViewDto>());

            // Act
            var result = await _mockCategoryService.Object.GetCustomerProductsByCategoryIdAsync(categoryId);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(0, result.Count());
        }

        [TestCleanup]
        public void Cleanup()
        {
            _dbContext.Database.EnsureDeleted();
            _dbContext.Dispose();
        }
    }
}