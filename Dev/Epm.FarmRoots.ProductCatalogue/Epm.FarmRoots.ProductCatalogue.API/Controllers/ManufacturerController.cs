using Epm.FarmRoots.ProductCatalogue.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Epm.FarmRoots.ProductCatalogue.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManufacturerController : ControllerBase
    {
        private readonly ManufacturerDbContext _context;

        public ManufacturerController(ManufacturerDbContext context)
        {
            _context = context;
        }

        [HttpGet("{ManufacturerId}")]
        public async Task<IActionResult> GetManufacturerByManufacturerId(int ManufacturerId)
        {
            var item = await _context.Manufacturers.FindAsync(ManufacturerId);
            if (item != null)
            {
                return Ok(item);
            }
            return NotFound();
        }

        [HttpGet]
        public async Task<IActionResult> GetManufacturers()
        {
            var items = await _context.Manufacturers.ToListAsync();
            return Ok(items);
        }

        [HttpPut("{id}/toggle-featured")]
        public async Task<IActionResult> ToggleFeaturedStatus(int id)
        {
            var manufacturer = await _context.Manufacturers.FindAsync(id);
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
            var manufacturer = await _context.Manufacturers.FindAsync(id);
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
            var manufacturer = await _context.Manufacturers.FindAsync(id);
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
