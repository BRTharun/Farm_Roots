using Epm.FarmRoots.ProductCatalogue.Core.Entities;

namespace Epm.FarmRoots.ProductCatalogue.Core.Interfaces
{
    public interface IManufacturerRepository
    {
        Task<IEnumerable<Manufacturer>> GetAllAsync();
        Task<Manufacturer> GetByIdAsync(int id);
        Task AddAsync(Manufacturer manufacture);

        IQueryable<Manufacturer> Manufacturers { get; }
    }
}
