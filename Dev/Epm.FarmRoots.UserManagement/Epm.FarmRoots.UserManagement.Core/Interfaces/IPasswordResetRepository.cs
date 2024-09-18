using Epm.FarmRoots.UserManagement.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epm.FarmRoots.UserManagement.Core.Interfaces
{
    public interface IPasswordResetRepository
    {
        Task<PasswordResetToken> GetPasswordResetTokenAsync(string token, string email);
        Task CreatePasswordResetTokenAsync(PasswordResetToken passwordResetToken);
        Task DeletePasswordResetTokenAsync(PasswordResetToken passwordResetToken);
    }
}
