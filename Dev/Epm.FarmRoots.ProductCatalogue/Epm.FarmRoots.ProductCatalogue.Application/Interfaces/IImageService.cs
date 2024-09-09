using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.ProductCatalogue.Application.Interfaces
{
    public interface IImageService
    {
        Task AddImageAsync(Images image);
        Task<Images> GetImageByIdAsync(int id);
        // Add more methods as needed
    }

}
