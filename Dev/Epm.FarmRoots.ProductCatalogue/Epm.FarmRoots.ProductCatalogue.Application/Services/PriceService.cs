using AutoMapper;
using Epm.FarmRoots.ProductCatalogue.Application.Dtos;
using Epm.FarmRoots.ProductCatalogue.Application.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Epm.FarmRoots.ProductCatalogue.Core.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epm.FarmRoots.ProductCatalogue.Application.Services
{
    public class PriceService : IPriceService
    {
        private readonly IPriceRepository _priceRepository;
        private readonly IMapper _mapper;

        public PriceService(IPriceRepository priceRepository, IMapper mapper)
        {
            _priceRepository = priceRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<PriceDto>> GetAllPricesAsync()
        {
            var prices = await _priceRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<PriceDto>>(prices);
        }

        public async Task<PriceDto> GetPriceByIdAsync(int id)
        {
            var price = await _priceRepository.GetByIdAsync(id);
            return _mapper.Map<PriceDto>(price);
        }

        public async Task<(PriceDto, string)> CreatePriceAsync(PriceDto priceDto)
        {
            if (priceDto == null)
                return (null, "Price data is required.");

            
            if (priceDto.SalePrice < 0 || priceDto.Mrp < 0 || priceDto.ProductCost < 0 || priceDto.ProductId < 0)
                return (null, "Fields must not contain negative values.");

           
            if (priceDto.SalePrice == 0 || priceDto.Mrp == 0 || priceDto.ProductCost == 0 || priceDto.ProductId == 0)
                return (null, "All fields except special price, From and To dates are required.");

            
            if (priceDto.SalePrice >= priceDto.Mrp)
                return (null, "Sale price must be less than MRP.");

            
            if (priceDto.SpecialPrice != null && (priceDto.SpecialPrice >= priceDto.SalePrice || priceDto.SpecialPrice >= priceDto.Mrp))
                return (null, "Special price must be less than both sale price and MRP.");

            
            if (priceDto.SpecialPriceFromDate != null && priceDto.SpecialPriceToDate != null && priceDto.SpecialPriceFromDate >= priceDto.SpecialPriceToDate)
                return (null, "'From' date should be less than 'To' date.");

           
            if (priceDto.ProductCost >= priceDto.Mrp)
                return (null, "Product cost must be less than MRP.");

            var price = _mapper.Map<Price>(priceDto);
            await _priceRepository.AddAsync(price);
            var priceDtoResult = _mapper.Map<PriceDto>(price);
            return (priceDtoResult, null);
        }

        public async Task<string> UpdatePriceAsync(PriceDto priceDto)
        {
            if (priceDto == null)
                return "Price data is required.";

            
            if (priceDto.SalePrice < 0 || priceDto.Mrp < 0 || priceDto.ProductCost < 0 || priceDto.ProductId < 0)
                return "Fields must not contain negative values.";

            
            if (priceDto.SalePrice == 0 || priceDto.Mrp == 0 || priceDto.ProductCost == 0 || priceDto.ProductId == 0)
                return "All fields except special price, From and To dates are required.";

            
            if (priceDto.SalePrice >= priceDto.Mrp)
                return "Sale price must be less than MRP.";

            
            if (priceDto.SpecialPrice != null && (priceDto.SpecialPrice >= priceDto.SalePrice || priceDto.SpecialPrice >= priceDto.Mrp))
                return "Special price must be less than both sale price and MRP.";

            
            if (priceDto.SpecialPriceFromDate != null && priceDto.SpecialPriceToDate != null && priceDto.SpecialPriceFromDate >= priceDto.SpecialPriceToDate)
                return "'From' date should be less than 'To' date.";

            
            if (priceDto.ProductCost >= priceDto.Mrp)
                return "Product cost must be less than MRP.";

            var price = _mapper.Map<Price>(priceDto);
            await _priceRepository.UpdateAsync(price);
            return null; 
        }

        public async Task DeletePriceAsync(int id)
        {
            var price = await _priceRepository.GetByIdAsync(id);
            await _priceRepository.DeleteAsync(price);
        }
    }
}