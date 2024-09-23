using Microsoft.EntityFrameworkCore;
using Epm.FarmRoots.ProductCatalogue.Infrastructure.Data;
using Epm.FarmRoots.ProductCatalogue.API.Controllers;
using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Epm.FarmRoots.ProductCatalogue.Tests
{
    [TestClass]
    public class InventoryCartControllerTests
    {
        private ProductDbContext _context;
        private InventoryCartController _controller;

        [TestInitialize]
        public void Initialize()
        {
            var options = new DbContextOptionsBuilder<ProductDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            _context = new ProductDbContext(options);
            _controller = new InventoryCartController(_context);

            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            // Seed necessary Product entities
            _context.Products.AddRange(
                new Product { ProductId = 1, ProductName = "Apple", Published = true, ShortDescription = "Red apple" },
                new Product { ProductId = 2, ProductName = "Orange", Published = false, ShortDescription = "Fresh fruit" }
            );

            // Seed the Inventory database
            _context.Inventory.AddRange(
                new Inventory { InventoryId = 1, ProductId = 1 },
                new Inventory { InventoryId = 2, ProductId = 2 }
            );
            _context.SaveChanges();
        }

        [TestMethod]
        public async Task GetInventories_ReturnsAllInventories()
        {
            var result = await _controller.GetInventories();

            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var inventories = okResult.Value as IEnumerable<Inventory>;
            Assert.AreEqual(2, inventories.Count());
        }

        [TestMethod]
        public async Task PostInventory_AddsInventory()
        {
            var inventory = new Inventory { InventoryId = 3, ProductId = 3 };

            var result = await _controller.PostInventory(inventory);

            var createdAtActionResult = result.Result as CreatedAtActionResult;
            Assert.IsNotNull(createdAtActionResult);
            Assert.AreEqual(201, createdAtActionResult.StatusCode);
            Assert.AreEqual(inventory, createdAtActionResult.Value);

            var addedItem = _context.Inventory.FirstOrDefault(i => i.InventoryId == 3);
            Assert.IsNotNull(addedItem);
            Assert.AreEqual(3, addedItem.ProductId);
        }
    }
}