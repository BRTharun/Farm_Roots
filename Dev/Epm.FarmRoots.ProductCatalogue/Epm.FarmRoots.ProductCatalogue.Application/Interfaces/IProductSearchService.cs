using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.ProductCatalogue.Core.Interfaces
{
    public interface IProductSearchService
    {
        Task<IEnumerable<Product>> SearchProductsByNameAsync(string name);
        Task<IEnumerable<Product>> SearchProductsByVoiceAsync(string voiceCommand);
    }
}
