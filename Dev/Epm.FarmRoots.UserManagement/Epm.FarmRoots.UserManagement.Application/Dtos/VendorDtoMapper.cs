using AutoMapper;
using Epm.FarmRoots.UserManagement.Core.Entities;

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
