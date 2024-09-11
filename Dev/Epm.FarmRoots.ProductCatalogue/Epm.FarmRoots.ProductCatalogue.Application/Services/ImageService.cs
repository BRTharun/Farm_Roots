using Epm.FarmRoots.ProductCatalogue.Application.Interfaces;
using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Epm.FarmRoots.ProductCatalogue.Infrastructure;
using Epm.FarmRoots.ProductCatalogue.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.ProductCatalogue.Application.Services
{
    public class ImageService : IImageService
    {
        private readonly ProductDbContext _context;

        public ImageService(ProductDbContext context)
        {
            _context = context;
        }

        public async Task AddImageAsync(Images image)
        {
            _context.Images.Add(image);
            await _context.SaveChangesAsync();
        }

        public async Task<Images> GetImageByIdAsync(int id)
        {
            return await _context.Images.FindAsync(id);
        }
    }

}
