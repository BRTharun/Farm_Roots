#pragma warning disable
using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Core.Entities;
using Epm.FarmRoots.UserManagement.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.UserManagement.Application.Interfaces
{
    public interface IVendorService
    {
        Task<VendorDto> RegisterVendorAsync(VendorDto vendorDto);
        Task<VendorDto> GetVendorByIdAsync(int id);
    }
}
