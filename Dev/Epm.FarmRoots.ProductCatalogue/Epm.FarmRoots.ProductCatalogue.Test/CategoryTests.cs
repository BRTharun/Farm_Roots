using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Epm.FarmRoots.ProductCatalogue.Infrastructure.Repositories;
using Epm.FarmRoots.ProductCatalogue.Infrastructure.Data;
using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;

namespace Epm.FarmRoots.ProductCatalogue.Tests
{
    [TestClass]
    public class SubCategoryRepoTests
    {
        private SubCategoryRepo _subCategoryRepo;
        private CategoryRepo _categoryRepo;
        private Mock<IServiceProvider> _mockServiceProvider;
        private ProductCatalogueDbContext _dbContext;

        [TestInitialize]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ProductCatalogueDbContext>()
                .UseInMemoryDatabase(databaseName: "ProductCatalogueDb")
                .Options;
            _dbContext = new ProductCatalogueDbContext(options);

            _mockServiceProvider = new Mock<IServiceProvider>();
            _subCategoryRepo = new SubCategoryRepo(_dbContext, _mockServiceProvider.Object);
            _categoryRepo = new CategoryRepo(_dbContext, _mockServiceProvider.Object);
        }

        [TestMethod]
        public async Task AddSubCategoryAsync_ShouldAddSubCategory()
        {
            var subCategory = new SubCategory { SubCategoryId = 1, SubCategoryName = "Smartphones", CategoryId = 1 };
            await _subCategoryRepo.AddSubCategoryAsync(subCategory);

            var result = await _dbContext.SubCategories.FirstOrDefaultAsync(sc => sc.SubCategoryId == 1);
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
            _dbContext.SubCategories.Add(new SubCategory { SubCategoryId = 1, SubCategoryName = "Smartphones", CategoryId = 1 });
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
            _dbContext.Categories.AddRange(new Category { CategoryId = 1, CategoryName = "Electronics" },
                                           new Category { CategoryId = 2, CategoryName = "Clothing" });
            _dbContext.SaveChanges();

            var result = await _categoryRepo.GetAllCategoriesAsync();
            Assert.AreEqual(2, result.Count);
            Assert.IsTrue(result.Any(c => c.CategoryName == "Electronics"));
            Assert.IsTrue(result.Any(c => c.CategoryName == "Clothing"));
        }

        //[TestMethod]
        //public async Task GetProductsByCategoryIdAsync_ShouldReturnProducts()
        //{
        //    // Assuming ProductDbContext and Products setup
        //    var mockProductDbContext = new Mock<ProductDbContext>();
        //    _mockServiceProvider.Setup(sp => sp.GetService(typeof(ProductDbContext)))
        //                        .Returns(mockProductDbContext.Object);

        //    var products = new List<Product>
        //        {
        //            new Product { ProductId = 1, PrdouctName = "Laptop", CategoryId = 1 },
        //            new Product { ProductId = 2, ProductName = "Camera", CategoryId = 1 }
        //        };

        //    mockProductDbContext.Setup(db => db.Products).ReturnsDbSet(products);

        //    var result = await _categoryRepo.GetProductsByCategoryIdAsync(1);
        //    Assert.AreEqual(2, result.Count());
        //    Assert.IsTrue(result.Any(p => p.ProductName == "Laptop"));
        //    Assert.IsTrue(result.Any(p => p.ProductName == "Camera"));
        //}

        [TestMethod]
        public async Task GetSubcategoriesByCategoryIdAsync_ShouldReturnSubCategories()
        {
            _dbContext.SubCategories.AddRange(new SubCategory { SubCategoryId = 1, SubCategoryName = "Smartphones", CategoryId = 1 },
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
            _dbContext.SubCategories.AddRange(new SubCategory { SubCategoryId = 1, SubCategoryName = "Smartphones", CategoryId = 1 },
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
            _dbContext.SubCategories.Add(subCategory);
            _dbContext.SaveChanges();

            subCategory.SubCategoryName = "Updated Name";
            await _subCategoryRepo.UpdateSubCategoryAsync(subCategory);

            var updatedSubCategory = await _dbContext.SubCategories.FindAsync(1);
            Assert.AreEqual("Updated Name", updatedSubCategory.SubCategoryName);
        }

        //[TestMethod]
        //public async Task GetProductsBySubCategoryIdAsync_ShouldReturnProducts()
        //{
        //    // Assuming ProductDbContext and Products setup
        //    var mockProductDbContext = new Mock<ProductDbContext>();
        //    _mockServiceProvider.Setup(sp => sp.GetService(typeof(ProductDbContext)))
        //                        .Returns(mockProductDbContext.Object);

        //    var products = new List<Product>
        //    {
        //        new Product { ProductId = 1, ProductName = "iPhone", SubCategoryId = 1 },
        //        new Product { ProductId = 2, ProductName = "Galaxy", SubCategoryId = 1 }
        //    };

        //    mockProductDbContext.Setup(db => db.Products).ReturnsDbSet(products);

        //    var result = await _subCategoryRepo.GetProductsBySubCategoryIdAsync(1);
        //    Assert.AreEqual(2, result.Count());
        //    Assert.IsTrue(result.Any(p => p.ProductName == "iPhone"));
        //    Assert.IsTrue(result.Any(p => p.ProductName == "Galaxy"));
        //}

        [TestCleanup]
        public void Cleanup()
        {
            _dbContext.Database.EnsureDeleted();
            _dbContext.Dispose();
        }
    }
}