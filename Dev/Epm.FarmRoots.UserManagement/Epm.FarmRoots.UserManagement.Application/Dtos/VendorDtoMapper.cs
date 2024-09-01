#pragma warning disable
using AutoMapper;
using Epm.FarmRoots.UserManagement.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.UserManagement.Application.Dtos
{
    public class VendorDtoMapper : Profile
    {
        public VendorDtoMapper()
        {
            CreateMap<Vendor, VendorDto>();
            CreateMap<VendorDto, Vendor>();
        }
    }
}
