using AutoMapper;
using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Core.Entities;
namespace Epm.FarmRoots.UserManagement.Application.Mappings
{
   public class CustomerUpdateMapping : Profile
    {
        public CustomerUpdateMapping()
        {
            CreateMap<Customer, CustomerUpdateDto>().ReverseMap();
            CreateMap<Customer, CustomerUpdateResponseDto>();
        }
    }
}
