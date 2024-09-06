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
            CreateMap<Product, ProductDto>()
                .ForMember(dest => dest.ProductSalePrice, opt => opt.MapFrom(src => src.ProductSale_Price))
                .ReverseMap() // This allows mapping from ProductDto to Product as well
                .ForMember(dest => dest.ProductSale_Price, opt => opt.MapFrom(src => src.ProductSalePrice));

            CreateMap<Category, CategoryDto>().ReverseMap();

        }
    }
}