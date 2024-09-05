
using AutoMapper;
using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Epm.FarmRoots.UserManagement.Core.Entities;
using Epm.FarmRoots.UserManagement.Core.Interfaces;

namespace Epm.FarmRoots.UserManagement.Application.Services
{
    public class VendorRegisterService : IVendorService
    {
        private readonly  IVendorRepository _vendorRepository;
        private readonly IMapper _mapper;
        public VendorRegisterService(IVendorRepository vendorRepository, IMapper mapper)
        {
            _vendorRepository = vendorRepository;
            _mapper = mapper;
        }

        public async Task<VendorDto> RegisterVendorAsync(VendorDto vendorDto)
        {
            try{
                var vendor = _mapper.Map<Vendor>(vendorDto);
                var registeredVendor = await _vendorRepository.RegisterVendorAsync(vendor);
                var registeredVendorDto = _mapper.Map<VendorDto>(registeredVendor);
                return registeredVendorDto;
            }
            catch (Exception ex)
            {
                throw new Exception("Vendor Registration Failed.");
            }
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _vendorRepository.EmailExistsAsync(email);
        }
    }
}
