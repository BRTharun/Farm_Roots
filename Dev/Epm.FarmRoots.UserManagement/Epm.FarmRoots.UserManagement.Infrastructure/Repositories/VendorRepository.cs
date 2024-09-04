﻿#pragma warning disable
using Epm.FarmRoots.UserManagement.Core.Entities;
using Epm.FarmRoots.UserManagement.Core.Interfaces;
using Epm.FarmRoots.UserManagement.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.UserManagement.Infrastructure.Repositories
{
    public class VendorRepository : IVendorRepository
    {
        private readonly ApplicationDbContext _context;
        public VendorRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Vendor> RegisterVendorAsync(Vendor vendor)
        {
            var existingVendor = await _context.VendorDb.FirstOrDefaultAsync(v => v.Email == vendor.Email);
            if (existingVendor != null)
            {
                throw new InvalidOperationException("An account with this email already exists.");
            }
            _context.VendorDb.Add(vendor);
            await _context.SaveChangesAsync();
            return vendor;
        }
        public async Task<Vendor> GetVendorByIdAsync(int id)
        {
            return await _context.VendorDb.FirstOrDefaultAsync(v => v.Id == id);
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _context.VendorDb.AnyAsync(u => u.Email == email);
        }
    }
}