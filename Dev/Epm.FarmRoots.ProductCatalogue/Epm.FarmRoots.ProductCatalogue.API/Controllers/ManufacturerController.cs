using Epm.FarmRoots.ProductCatalogue.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Epm.FarmRoots.ProductCatalogue.API.Controllers
{
    [Route("api/FarmRoots/[controller]")]
    [ApiController]
    public class ManufacturerController : ControllerBase
    {
        private readonly ProductDbContext _context;

        public ManufacturerController(ProductDbContext context)
        {
            _context = context;
        }

        [HttpGet("{ManufacturerId}")]
        public async Task<IActionResult> GetManufacturerByManufacturerId(int ManufacturerId)
        {
            var item = await _context.Manufacturer.FindAsync(ManufacturerId);
            if (item != null)
            {
                return Ok(item);
            }
            return NotFound();
        }

        [HttpGet]
        public async Task<IActionResult> GetManufacturers()
        {
            var items = await _context.Manufacturer.ToListAsync();
            return Ok(items);
        }

        [HttpPut("{id}/toggle-featured")]
        public async Task<IActionResult> ToggleFeaturedStatus(int id)
        {
            var manufacturer = await _context.Manufacturer.FindAsync(id);
            if (manufacturer == null)
            {
                return NotFound();
            }

            manufacturer.ManufactureFeaturedStatus = !manufacturer.ManufactureFeaturedStatus;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}/display-order")]
        public async Task<IActionResult> UpdateDisplayOrder(int id, [FromBody] int newDisplayOrder)
        {
            var manufacturer = await _context.Manufacturer.FindAsync(id);
            if (manufacturer == null)
            {
                return NotFound();
            }

            manufacturer.ManufactureDisplayOrder = newDisplayOrder;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> SoftDeleteManufacturer(int id)
        {
            var manufacturer = await _context.Manufacturer.FindAsync(id);
            if (manufacturer == null)
            {
                return NotFound();
            }
            manufacturer.IsActive = false;
            manufacturer.ManufactureDisplayOrder = 0;
            manufacturer.ManufactureFeaturedStatus=false;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
