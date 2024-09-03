using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Epm.FarmRoots.ProductCatalogue.Core.Entities;
using static Azure.Core.HttpHeader;

namespace Epm.FarmRoots.ProductCatalogue.Application.Dtos
{
    public class CategoryMapper
    {
        public static MapperConfiguration RegisterMaps()
        {
            var mapConfig = new MapperConfiguration(Config =>
            {
                Config.CreateMap<CategoryDto, Category>();
                Config.CreateMap<Category, CategoryDto>();
            });
            return mapConfig;
        }
    }
}
