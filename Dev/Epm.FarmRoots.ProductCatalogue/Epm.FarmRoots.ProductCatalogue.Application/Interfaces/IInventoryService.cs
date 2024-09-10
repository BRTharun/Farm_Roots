using Epm.FarmRoots.ProductCatalogue.Core.Entities;

namespace Epm.FarmRoots.ProductCatalogue.Application.Interfaces
{
    public interface IInventoryService
    {
        Task<IEnumerable<Inventory>> GetAllInventoriesAsync();
        Task<Inventory> GetInventoryByIdAsync(int id);
        Task<Inventory> CreateInventoryAsync(Inventory inventory);
        Task UpdateInventoryAsync(Inventory inventory);
        Task DeleteInventoryAsync(int id);
    }
}
