using AutoMapper;
using Epm.FarmRoots.UserManagement.Application.Dtos;
using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Epm.FarmRoots.UserManagement.Core.Entities;
using Epm.FarmRoots.UserManagement.Core.Interfaces;
namespace Epm.FarmRoots.UserManagement.Application.Services
{
    public class VendorAddressService : IVendorAddressService
    {
        private readonly IVendorAddressRepository _vendorAddressRepository;
        private readonly IMapper _mapper;

        public VendorAddressService(IVendorAddressRepository vendorAddressRepository, IMapper mapper)
        {
            _vendorAddressRepository = vendorAddressRepository;
            _mapper = mapper;
        }

        public async Task<List<VendorAddressDto>> GetAddressesByVendorIdAsync(int vendorId)
        {
            var addresses = await _vendorAddressRepository.GetAddressesByVendorIdAsync(vendorId);
            var addressDtos = addresses.Select(address => _mapper.Map<VendorAddressDto>(address)).ToList();

            return addressDtos;
        }

        public async Task AddVendorAddressAsync(int vendorId, VendorAddressDto addressDto)
        {
            var address = _mapper.Map<VendorAddress>(addressDto);
            address.VendorId = vendorId;
            await _vendorAddressRepository.AddAddressAsync(address);
        }

        public async Task UpdateVendorAddressAsync(VendorAddressDto addressDto)
        {
            var existingAddress = await _vendorAddressRepository.GetAddressByIdAsync(addressDto.VendorAddressId);
            if (existingAddress == null)
            {
                throw new KeyNotFoundException("Specified address not found.");
            }
            _mapper.Map(addressDto, existingAddress);
            await _vendorAddressRepository.UpdateAddressAsync(existingAddress);
        }
    }
}
