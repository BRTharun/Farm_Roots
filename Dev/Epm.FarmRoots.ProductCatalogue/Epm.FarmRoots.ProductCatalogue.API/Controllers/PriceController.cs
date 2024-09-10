
using Microsoft.AspNetCore.Mvc;
using Epm.FarmRoots.ProductCatalogue.Application.Dtos;
using Epm.FarmRoots.ProductCatalogue.Application.Interfaces;
using System.Threading.Tasks;

namespace Epm.FarmRoots.ProductCatalogue.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PriceController : ControllerBase
    {
        private readonly IPriceService _priceService;

        public PriceController(IPriceService priceService)
        {
            _priceService = priceService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var prices = await _priceService.GetAllPricesAsync();
            return Ok(prices);
        }

        [HttpGet]
        [Route("/api/{prodId:int}/{priceId:int}")]
        public async Task<IActionResult> Get(int prodId, int priceId)
        {
            var price = await _priceService.GetPriceByIdAsync(priceId);
            return Ok(price);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PriceDto priceDto)
        {
            (PriceDto createdPrice, string errorMessage) = await _priceService.CreatePriceAsync(priceDto);

            if (errorMessage != null)
            {
                return BadRequest(errorMessage);
            }

            return CreatedAtAction(nameof(Get), new { prodId = createdPrice.ProductId, priceId = createdPrice.PriceId }, createdPrice);
        }

        [HttpPut("{priceId:int}")]

        public async Task<IActionResult> Update(int priceId, [FromBody] PriceDto priceDto)
        {
            if (priceDto == null)
            {
                return BadRequest("Price data is required.");
            }

            
            if (priceId != priceDto.PriceId)
            {
                return BadRequest("Mismatched Price ID in URL and body.");
            }

            
            string errorMessage = await _priceService.UpdatePriceAsync(priceDto);
            if (errorMessage != null)
            {
                return BadRequest(errorMessage);
            }

            return NoContent(); 
        }

        [HttpDelete]
        [Route("/api/{priceId}")]
        public async Task<IActionResult> Delete(int priceId)
        {
            await _priceService.DeletePriceAsync(priceId);
            return NoContent();
        }
    }
}