﻿using Epm.FarmRoots.ProductCatalogue.Application.Dtos;
using Microsoft.AspNetCore.Mvc;
using Epm.FarmRoots.ProductCatalogue.Application.Interfaces;

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

        [HttpGet("{id}/products")]
        public async Task<ResponseDto> GetProductsByCategoryId(int id)
        {
            try
            {
                var products = await _categoryService.GetProductsByCategoryIdAsync(id);
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

        [HttpGet("{id}/customer-products")]
        public async Task<ResponseDto> GetCustomerProductsByCategoryId(int id)
        {
            try
            {
                var products = await _categoryService.GetCustomerProductsByCategoryIdAsync(id);
                _responseDto.Result = products;
                _responseDto.IsSuccess = true;
                if (products == null || !products.Any())
                {
                    _responseDto.IsSuccess = false;
                    _responseDto.Message = "No products found for this category.";
                }
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Message = ex.Message;
            }
            return _responseDto;
        }

        [HttpGet("{id}/subcategories")]
        public async Task<ResponseDto> GetSubcategoriesByCategoryId(int id)
        {
            try
            {
                var subcategories = await _categoryService.GetSubcategoriesByCategoryIdAsync(id);
                _responseDto.Result = subcategories;
                _responseDto.IsSuccess = true;
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
