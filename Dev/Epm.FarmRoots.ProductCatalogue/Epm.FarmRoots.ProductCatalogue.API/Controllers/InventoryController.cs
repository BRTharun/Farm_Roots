using Epm.FarmRoots.ProductCatalogue.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Epm.FarmRoots.ProductCatalogue.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly InventoryDbContext _context;

        public InventoryController(InventoryDbContext context)
        {
            _context = context;
        }

        [HttpGet("{productId}")]
        public async Task<IActionResult> GetInventoryItemByProductId(int productId)
        {
            var item = await _context.InventoryItems.FindAsync(productId);
            if (item != null)
            {
                return Ok(item);
            }
            return NotFound();
        }


        [HttpPut("{id}/stock")]
        public async Task<IActionResult> UpdateStock(int id, [FromBody] StockUpdateModel model)
        {
            var item = await _context.InventoryItems.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            item.ProductStock = model.NewStock;
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpPut("{id}/status")]
        public async Task<IActionResult> ToggleStatus(int id)
        {
            var item = await _context.InventoryItems.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            item.ProductStatus = !item.ProductStatus;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> GetInventoryItems()
        {
            var items = await _context.InventoryItems.ToListAsync();
            return Ok(items);
        }
    }
    public class StockUpdateModel
    {
        public int NewStock { get; set; }
    }
}
