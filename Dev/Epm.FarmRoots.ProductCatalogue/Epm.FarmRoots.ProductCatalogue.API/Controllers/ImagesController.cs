using Epm.FarmRoots.ProductCatalogue.Application.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

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

        // Endpoint for uploading multiple images
        [HttpPost("upload")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadImages([FromForm] IList<IFormFile> images)
        {
            // Check if no images were uploaded
            if (images == null || images.Count == 0)
            {
                return BadRequest("No images selected for upload.");
            }

            var imageEntities = new List<Images>();

            // Process each uploaded image
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
                        ImageUrl = null // Adjust if necessary
                    };

                    await _imageService.AddImageAsync(newImage);
                    imageEntities.Add(newImage);
                }
                else
                {
                    // If image length is 0, handle it appropriately
                    return BadRequest("Uploaded image is empty.");
                }
            }

            // Return a list of created images, using the first image's ID for the location in the response
            if (imageEntities.Any())
            {
                return CreatedAtAction(nameof(GetImageById), new { id = imageEntities.First().ImagesId }, imageEntities);
            }
            else
            {
                // If no image was successfully processed, return a server error
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while saving images.");
            }
        }

        // Get an image by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Images>> GetImageById(int id)
        {
            var image = await _imageService.GetImageByIdAsync(id);
            if (image == null)
            {
                return NotFound(); // Returns 404 if the image is not found
            }
            return Ok(image); // Returns 200 OK with the image
        }

        // View an image by ID
        [HttpGet("view/{id}")]
        public async Task<IActionResult> ViewImage(int id)
        {
            var image = await _imageService.GetImageByIdAsync(id);
            if (image == null)
            {
                return NotFound();
            }

            // You can determine content type dynamically if needed
            var contentType = "image/jpeg"; // Default to JPEG, adjust as necessary

            return File(image.ImageData, contentType);
        }
    }
}
