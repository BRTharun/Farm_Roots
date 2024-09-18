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
    public class PasswordResetRepository : IPasswordResetRepository
    {
        private readonly ApplicationDbContext _context;

        public PasswordResetRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<PasswordResetToken> GetPasswordResetTokenAsync(string token, string email)
        {
            return await _context.PasswordResetTokens.FirstOrDefaultAsync(t => t.Token == token && t.Email == email);
        }


        public async Task CreatePasswordResetTokenAsync(PasswordResetToken passwordResetToken)
        {
            await _context.PasswordResetTokens.AddAsync(passwordResetToken);
            await _context.SaveChangesAsync();
        }

        public async Task DeletePasswordResetTokenAsync(PasswordResetToken passwordResetToken)
        {
            _context.PasswordResetTokens.Remove(passwordResetToken);
            await _context.SaveChangesAsync();
        }
    }
}
