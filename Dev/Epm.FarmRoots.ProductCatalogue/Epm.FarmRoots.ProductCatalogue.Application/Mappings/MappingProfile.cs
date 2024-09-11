using AutoMapper;
using Epm.FarmRoots.ProductCatalogue.Application.Dtos;
using Epm.FarmRoots.ProductCatalogue.Core.Entities;

namespace Epm.FarmRoots.ProductCatalogue.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Product, CreateProductDto>().ReverseMap();

            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Price, PriceDto>().ReverseMap();
            CreateMap<Product, ResponseProductDto>().ReverseMap();

            CreateMap<Manufacturer, ManufacturerDto>().ReverseMap();

            CreateMap<Inventory, InventoryDto>().ReverseMap();

            CreateMap<SubCategory, SubCategoryDto>().ReverseMap();

            CreateMap<Product, CustomerProductViewDto>()
           .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.ProductName))
           .ForMember(dest => dest.ShortDescription, opt => opt.MapFrom(src => src.ShortDescription))
           .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price.SalePrice)) // Ensure Price is fetched with the product
           .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.Images.ImageData)); // Ensure Images are fetched with the product

        }
    }
}