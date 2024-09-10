using Epm.FarmRoots.ProductCatalogue.Core.Entities;

namespace Epm.FarmRoots.ProductCatalogue.Application.Interfaces
{
    public interface IManufacturerService
    {
        Task<IEnumerable<Manufacturer>> GetAllManufacturesAsync();
        Task<Manufacturer> GetManufactureByIdAsync(int id);
        Task CreateManufactureAsync(Manufacturer manufacture);
    }
}
