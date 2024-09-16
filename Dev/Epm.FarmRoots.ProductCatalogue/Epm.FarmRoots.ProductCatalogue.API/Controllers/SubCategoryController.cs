using Epm.FarmRoots.ProductCatalogue.Application.Dtos;
using Epm.FarmRoots.ProductCatalogue.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Epm.FarmRoots.ProductCatalogue.API.Controllers
{
    [Route("api/FarmRoots/[controller]")]
    [ApiController]
    public class SubCategoryController : ControllerBase
    {
        private readonly ISubCategoryService _subCategoryService;
        private readonly ResponseDto _responseDto;

        public SubCategoryController(ISubCategoryService subCategoryService)
        {
            _subCategoryService = subCategoryService;
            _responseDto = new ResponseDto();
        }

        [HttpGet("{subcategoryId}/products")]
        public async Task<ResponseDto> GetProductsBySubCategoryId(int subcategoryId)
        {
            try
            {
                var products = await _subCategoryService.GetProductsBySubCategoryIdAsync(subcategoryId);
                _responseDto.Result = products;
                _responseDto.IsSuccess = true;
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Message = ex.Message;
            }
            return _responseDto;
        }

        [HttpGet("{id}/customer-sub-products")]
        public async Task<ResponseDto> GetCustomerProductsByCategoryId(int id)
        {
            try
            {
                var products = await _subCategoryService.GetCustomerProductsBySubCategoryIdAsync(id);
                _responseDto.Result = products;
                _responseDto.IsSuccess = true;
                if (products == null || !products.Any())
                {
                    _responseDto.IsSuccess = false;
                    _responseDto.Message = "No products found for this subcategory.";
                }
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Message = ex.Message;
            }
            return _responseDto;
        }
    }
}
