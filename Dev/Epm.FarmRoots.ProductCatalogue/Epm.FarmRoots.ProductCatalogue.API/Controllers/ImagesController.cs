using Epm.FarmRoots.ProductCatalogue.Application.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Epm.FarmRoots.ProductCatalogue.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImagesController : ControllerBase
    {
        private readonly IImageService _imageService;

        public ImagesController(IImageService imageService)
        {
            _imageService = imageService;
        }

        [HttpPost("upload")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadImages([FromForm] IList<IFormFile> images, [FromForm] int productId)
        {
            if (images == null || images.Count == 0)
            {
                return BadRequest("No images selected for upload.");
            }

            var imageEntities = new List<Images>();

            foreach (var image in images)
            {
                if (image.Length > 0)
                {
                    byte[] imageData;
                    using (var memoryStream = new MemoryStream())
                    {
                        await image.CopyToAsync(memoryStream);
                        imageData = memoryStream.ToArray();
                    }

                    var newImage = new Images
                    {
                        ImageData = imageData,
                        ProductId = productId,
                        ImageUrl = null 
                    };

                    await _imageService.AddImageAsync(newImage);
                    imageEntities.Add(newImage);
                }
                else
                {
                    return BadRequest("Uploaded image is empty.");
                }
            }

            if (imageEntities.Any())
            {
                return CreatedAtAction(nameof(GetImageById), new { id = imageEntities.First().ImagesId }, imageEntities);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while saving images.");
            }
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Images>> GetImageById(int id)
        {
            var image = await _imageService.GetImageByIdAsync(id);
            if (image == null)
            {
                return NotFound(); 
            }
            return Ok(image); 
        }

        [HttpGet("view/{id}")]
        public async Task<IActionResult> ViewImage(int id)
        {
            var image = await _imageService.GetImageByIdAsync(id);
            if (image == null)
            {
                return NotFound();
            }

            var contentType = "image/jpeg"; 

            return File(image.ImageData, contentType);
        }
    }
}
