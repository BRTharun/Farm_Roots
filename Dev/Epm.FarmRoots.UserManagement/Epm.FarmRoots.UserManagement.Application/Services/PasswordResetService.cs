//using Epm.FarmRoots.UserManagement.Application.Interfaces;
//using Epm.FarmRoots.UserManagement.Core.Entities;
////using BCrypt.Net;
//using Epm.FarmRoots.UserManagement.Core.Interfaces;
//using Microsoft.AspNet.Identity.EntityFramework;
//using Microsoft.AspNetCore.Identity;
////using Org.BouncyCastle.Crypto.Generators;

//namespace Epm.FarmRoots.UserManagement.Application.Services
//{
//    public class PasswordResetService : IPasswordResetService
//    {
//        private readonly IEmailService _emailService;

//        private readonly IPasswordResetRepository _passwordResetRepository;
//        //private readonly IUserRepository _userRepository;
//        private readonly ICustomerRepository _customerRepository;

//        public PasswordResetService(IPasswordResetRepository passwordResetRepository, IEmailService emailService, ICustomerRepository customerRepository)
//        {
//            _passwordResetRepository = passwordResetRepository;
//            _emailService = emailService;
//            //_userRepository = userRepository;
//            _customerRepository = customerRepository;
//        }

//        public async Task<bool> SendResetLinkAsync(string email)
//        {
//            //var user = await _userRepository.GetUserByEmailAsync(email);
//            var customer = await _customerRepository.GetCustomerByEmailAsync(email);
//            if (customer == null)
//            {
//                return false;
//            }

//            var token = Guid.NewGuid().ToString();
//            var expiration = DateTime.Now.AddHours(1);

//            var resetToken = new PasswordResetToken
//            {
//                Email = email,
//                Token = token,
//                Expiration = expiration
//            };

//            await _passwordResetRepository.CreatePasswordResetTokenAsync(resetToken);

//            var resetLink = $"http://localhost:4200/reset-password?token={token}&email={email}";
//            await _emailService.SendEmailAsync(email, "Password Reset", $"Please reset your password using this link: {resetLink}");

//            return true;
//        }


//        public async Task<bool> ResetPasswordAsync(string token, string email, string newPassword)
//        {
//            var resetToken = await _passwordResetRepository.GetPasswordResetTokenAsync(token, email);

//            if (resetToken == null || resetToken.Expiration < DateTime.Now)
//            {
//                return false;
//            }

//            //var user = await _userRepository.GetUserByEmailAsync(email);
//            var customer = await _customerRepository.GetCustomerByEmailAsync(email);
//            if (customer == null)
//            {
//                return false;
//            }

//            if (!IsValidPassword(newPassword))
//            {
//                return false; // Password does not meet criteria
//            }




//            // Hash the new password before storing it
//            //string hashedPassword = BCrypt.Net.BCrypt.HashPassword(newPassword);
//            //user.Password = hashedPassword;

//            string hashedPassword = HashPassword(newPassword);
//            customer.Password = hashedPassword;

//            await _customerRepository.UpdateCustomerAsync(customer);

//            await _passwordResetRepository.DeletePasswordResetTokenAsync(resetToken);

//            return true;
//        }
//        private bool IsValidPassword(string password)
//        {
//            // Implement your password validation logic here (length, special characters, etc.)
//            return password.Length >= 8 &&
//                   password.Any(char.IsUpper) &&
//                   password.Any(char.IsLower) &&
//                   password.Any(char.IsDigit) &&
//                   password.Any(ch => !char.IsLetterOrDigit(ch));
//        }


//        private string HashPassword(object password)
//        {
//            var hasher = new PasswordHasher<IdentityUser>();
//            return hasher.HashPassword(null, password.ToString());
//        }
//    }
//}



using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Epm.FarmRoots.UserManagement.Core.Entities;
using Epm.FarmRoots.UserManagement.Core.Interfaces;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNetCore.Identity;

namespace Epm.FarmRoots.UserManagement.Application.Services
{
    public class PasswordResetService : IPasswordResetService
    {
        private readonly IEmailService _emailService;
        private readonly IPasswordResetRepository _passwordResetRepository;
        private readonly ICustomerRepository _customerRepository;
        private readonly IVendorRepository _vendorRepository; // Add this

        public PasswordResetService(IPasswordResetRepository passwordResetRepository, IEmailService emailService, ICustomerRepository customerRepository, IVendorRepository vendorRepository) // Modify the constructor
        {
            _passwordResetRepository = passwordResetRepository;
            _emailService = emailService;
            _customerRepository = customerRepository;
            _vendorRepository = vendorRepository; // Initialize the vendor repository
        }

        public async Task<bool> SendResetLinkAsync(string email, string userType) // Add userType parameter to distinguish between customer and vendor
        {
            dynamic user = userType == "vendor" ? await _vendorRepository.GetVendorByEmailAsync(email) : await _customerRepository.GetCustomerByEmailAsync(email);
            if (user == null)
            {
                return false;
            }

            var token = Guid.NewGuid().ToString();
            var expiration = DateTime.Now.AddHours(1);

            var resetToken = new PasswordResetToken
            {
                Email = email,
                Token = token,
                Expiration = expiration
            };

            await _passwordResetRepository.CreatePasswordResetTokenAsync(resetToken);

            var resetLink = $"http://localhost:4200/reset-password?token={token}&email={email}";
            await _emailService.SendEmailAsync(email, "Password Reset", $"Please reset your password using this link: {resetLink}");

            return true;
        }

        public async Task<bool> ResetPasswordAsync(string token, string email, string newPassword, string userType) // Add userType parameter
        {
            var resetToken = await _passwordResetRepository.GetPasswordResetTokenAsync(token, email);
            if (resetToken == null || resetToken.Expiration < DateTime.Now)
            {
                return false;
            }

            dynamic user = userType == "vendor" ? await _vendorRepository.GetVendorByEmailAsync(email) : await _customerRepository.GetCustomerByEmailAsync(email);
            if (user == null)
            {
                return false;
            }

            if (!IsValidPassword(newPassword))
            {
                return false; // Password does not meet criteria
            }

            string hashedPassword = HashPassword(newPassword);
            user.Password = hashedPassword;

            if (userType == "vendor")
            {
                await _vendorRepository.UpdateVendorAsync(user);
            }
            else
            {
                await _customerRepository.UpdateCustomerAsync(user);
            }

            await _passwordResetRepository.DeletePasswordResetTokenAsync(resetToken);

            return true;
        }

        private bool IsValidPassword(string password)
        {
            return password.Length >= 8 &&
                   password.Any(char.IsUpper) &&
                   password.Any(char.IsLower) &&
                   password.Any(char.IsDigit) &&
                   password.Any(ch => !char.IsLetterOrDigit(ch));
        }

        private string HashPassword(object password)
        {
            var hasher = new PasswordHasher<IdentityUser>();
            return hasher.HashPassword(null, password.ToString());
        }
    }
}