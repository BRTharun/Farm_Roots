using AutoMapper;
using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Core.Entities;

namespace Epm.FarmRoots.UserManagement.Application.Mappings
{
    public class CustomerAddressMapping : Profile
    {
        public CustomerAddressMapping()
        {
            CreateMap<Customer, CustomerDto>();
            CreateMap<CustomerDto, Customer>();
            CreateMap<CustomerAddress, CustomerAddressDto>();
            CreateMap<CustomerAddressDto, CustomerAddress>().ForMember(dest => dest.CustomerId, opt => opt.Condition(src => (src.CustomerId != 0)));
        }
    }
}
