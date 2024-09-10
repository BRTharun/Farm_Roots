using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Epm.FarmRoots.ProductCatalogue.Core.Interfaces
{
    public interface IPriceRepository
    {
        Task<IEnumerable<Price>> GetAllAsync();
        Task<Price> GetByIdAsync(int id);
        Task AddAsync(Price price);
        Task UpdateAsync(Price price);
        Task DeleteAsync(Price price);
    }
}