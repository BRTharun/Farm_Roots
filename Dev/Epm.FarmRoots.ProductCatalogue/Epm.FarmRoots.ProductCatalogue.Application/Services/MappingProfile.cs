using AutoMapper;
using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using Epm.FarmRoots.ProductCatalogue.Application.Dtos;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Epm.FarmRoots.ProductCatalogue.Application.Services
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Define mappings here
            CreateMap<Product, ProductDto>().ReverseMap();
        }
    }
}