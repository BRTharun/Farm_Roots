using Epm.FarmRoots.ProductCatalogue.Application.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Epm.FarmRoots.ProductCatalogue.Core.Interfaces;

namespace Epm.FarmRoots.ProductCatalogue.Application.Services
{
    public class InventoryCartService :IInventoryService
    {
        private readonly IInventoryCartRepository _repository;

        public InventoryCartService(IInventoryCartRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Inventory>> GetAllInventoriesAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Inventory> GetInventoryByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<Inventory> CreateInventoryAsync(Inventory inventory)
        {
            return await _repository.AddAsync(inventory);
        }

        public async Task UpdateInventoryAsync(Inventory inventory)
        {
            await _repository.UpdateAsync(inventory);
        }

        public async Task DeleteInventoryAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
