using AutoMapper;
using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Core.Entities;
namespace Epm.FarmRoots.UserManagement.Application.Mappings
{
    public class VendorAddressMapping : Profile
    {
        public VendorAddressMapping()
        {
            CreateMap<Vendor, VendorDto>();
            CreateMap<VendorDto, Vendor>();
            CreateMap<VendorAddress, VendorAddressDto>();
            CreateMap<VendorAddressDto, VendorAddress>().ForMember(dest => dest.VendorId, opt => opt.Condition(src => (src.VendorId != 0)));
        }
    }
}
