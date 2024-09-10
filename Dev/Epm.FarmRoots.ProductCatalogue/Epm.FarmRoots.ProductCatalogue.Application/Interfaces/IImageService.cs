using Epm.FarmRoots.ProductCatalogue.Core.Entities;

namespace Epm.FarmRoots.ProductCatalogue.Application.Interfaces
{
    public interface IImageService
    {
        Task AddImageAsync(Images image);
        Task<Images> GetImageByIdAsync(int id);
    }

}
