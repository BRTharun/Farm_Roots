using Epm.FarmRoots.ProductCatalogue.Application.Dtos;
using Microsoft.AspNetCore.Mvc;
using Epm.FarmRoots.ProductCatalogue.Application.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Epm.FarmRoots.ProductCatalogue.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly ResponseDto _responseDto;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
            _responseDto = new ResponseDto();
        }

        [HttpGet("{id}")]
        public async Task<ResponseDto> GetCategoryById(int id)
        {
            var category = await _categoryService.GetCategoryByIdAsync(id);
            _responseDto.Result = category;
            _responseDto.IsSuccess = true;
            return _responseDto;
        }

        [HttpGet]
        public async Task<ResponseDto> GetAllCategories()
        {
            var categories = await _categoryService.GetAllCategoriesAsync();
            _responseDto.Result = categories;
            _responseDto.IsSuccess = true;
            return _responseDto;
        }
    }
}
