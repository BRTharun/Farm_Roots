using Epm.FarmRoots.ProductCatalogue.Application.Dtos;

namespace Epm.FarmRoots.ProductCatalogue.Application.Interfaces
{
    public interface IPriceService
    {
        Task<IEnumerable<PriceDto>> GetAllPricesAsync();
        Task<PriceDto> GetPriceByIdAsync(int id);
        Task<(PriceDto, string)> CreatePriceAsync(PriceDto priceDto);
        Task<string> UpdatePriceAsync(PriceDto priceDto);
        Task DeletePriceAsync(int id);
    }
}