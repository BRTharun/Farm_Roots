using AutoMapper;
using Epm.FarmRoots.ProductCatalogue.Application.Dtos;
using Epm.FarmRoots.ProductCatalogue.Core.Entities;

namespace Epm.FarmRoots.ProductCatalogue.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Define the mapping from the Product entity to the ProductDto
            CreateMap<Product, ProductDto>().ReverseMap();

            CreateMap<Category, CategoryDto>().ReverseMap();

        }
    }
}