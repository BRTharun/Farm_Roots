using AutoMapper;
using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
