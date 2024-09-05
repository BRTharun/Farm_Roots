using AutoMapper;
using Epm.FarmRoots.UserManagement.Core.Entities;

namespace Epm.FarmRoots.UserManagement.Application.Dtos
{
    public class CustomerDtoMapper : Profile
    {
        public CustomerDtoMapper()
        {
            CreateMap<Customer, CustomerDto>();
            CreateMap<CustomerDto, Customer>();
        }

    }
}
