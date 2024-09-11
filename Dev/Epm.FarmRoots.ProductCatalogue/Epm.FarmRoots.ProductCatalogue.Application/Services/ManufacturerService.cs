using Epm.FarmRoots.ProductCatalogue.Application.Dtos;
using Epm.FarmRoots.ProductCatalogue.Application.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Epm.FarmRoots.ProductCatalogue.Core.Interfaces;

namespace Epm.FarmRoots.ProductCatalogue.Application.Services
{
    public class ManufacturerService : IManufacturerService
    {
        private readonly IManufacturerRepository _manufactureRepository;

        public ManufacturerService(IManufacturerRepository manufactureRepository)
        {
            _manufactureRepository = manufactureRepository;
        }

        public async Task<IEnumerable<Manufacturer>> GetAllManufacturesAsync()
        {
            return await _manufactureRepository.GetAllAsync();
        }

        public async Task<Manufacturer> GetManufactureByIdAsync(int id)
        {
            return await _manufactureRepository.GetByIdAsync(id);
        }

        public async Task CreateManufactureAsync(Manufacturer manufacture)
        {
            await _manufactureRepository.AddAsync(manufacture);
        }

        public List<ManufacturerDto> GetActiveManufacturers()
        {
            var activeManufacturers = _manufactureRepository.Manufacturers
                                             .Where(m => m.IsActive)
                                             .Select(m => new ManufacturerDto
                                             {
                                                 ManufactureId = m.ManufactureId,
                                                 ManufactureName = m.ManufactureName,
                                                 ManufactureFeaturedStatus = m.ManufactureFeaturedStatus,
                                                 ManufactureDisplayOrder = m.ManufactureDisplayOrder
                                             })
                                             .ToList();
            return activeManufacturers;
        }
    }
}
