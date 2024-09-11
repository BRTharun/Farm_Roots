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

        }
    }
}