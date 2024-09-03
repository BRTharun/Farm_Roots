using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Epm.FarmRoots.ProductCatalogue.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Repositories
{
    public class ProductRepository
    {
        private readonly InventoryDbContext _applicationDbContext;

        public ProductRepository(InventoryDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<List<InventoryItem>> GetAllInventoryItemsAsync(CancellationToken cancellationToken)
        {
            return await _applicationDbContext.InventoryItems.ToListAsync(cancellationToken);
        }

        public async Task<InventoryItem?> GetInventoryItemByProductIdAsync(int productId)
        {
            return await _applicationDbContext.InventoryItems.FirstOrDefaultAsync(item => item.ProductId == productId);
        }

        public async Task UpdateInventoryItemAsync(int inventoryItemId, int newStock, bool newStatus)
        {
            var inventoryItem = await _applicationDbContext.InventoryItems.FindAsync(inventoryItemId);

            if (inventoryItem != null)
            {
                inventoryItem.ProductStock = newStock;
                inventoryItem.ProductStatus = newStatus;

                _applicationDbContext.Entry(inventoryItem).State = EntityState.Modified;

                await _applicationDbContext.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentException("Inventory item not found", nameof(inventoryItemId));
            }
        }
    }
}
