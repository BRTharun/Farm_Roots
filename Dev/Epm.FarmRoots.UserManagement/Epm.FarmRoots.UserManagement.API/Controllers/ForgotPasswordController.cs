using Epm.FarmRoots.UserManagement.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Epm.FarmRoots.UserManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForgotPasswordController : ControllerBase
    {
        private readonly IPasswordResetService _passwordResetService;
        private readonly IEmailService _emailService;

        public ForgotPasswordController(IPasswordResetService passwordResetService, IEmailService emailService)
        {
            _passwordResetService = passwordResetService;
            _emailService = emailService;
        }

        [HttpPost("request-password-reset")]
        public async Task<IActionResult> RequestPasswordReset([FromBody] EmailRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || !IsValidEmail(request.Email))
            {
                return BadRequest("A valid email is required.");
            }

            var result = await _passwordResetService.SendResetLinkAsync(request.Email, request.userType);
            if (!result)
            {
                // Return a 404 Not Found status with a message
                return NotFound(new { message = "This email is not registered with us." });
            }

            return Ok(new { message = "Reset link sent to your email." });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        {
            if (string.IsNullOrEmpty(model.Token) || string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.NewPassword))
            {
                return BadRequest("Token, email, and new password are required.");
            }

            var result = await _passwordResetService.ResetPasswordAsync(model.Token, model.Email, model.NewPassword, model.userType);
            if (!result)
            {
                return BadRequest("Invalid or expired token.");
            }
            return Ok(new { message = "Password updated successfully." });
        }

        //[HttpGet("test-email")]
        //public async Task<IActionResult> TestEmail()
        //{
        //    try
        //    {
        //        await _emailService.SendEmailAsync("test@example.com", "Test Email", "This is a test email.");
        //        return Ok("Test email sent successfully.");
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Error sending test email: {ex.Message}");
        //    }
        //}

        private bool IsValidEmail(string email)
        {
            var emailPattern = @"^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";
            return System.Text.RegularExpressions.Regex.IsMatch(email, emailPattern);
        }
    }

    public class EmailRequest
    {
        public string Email { get; set; }
        public string userType { get; set; }
    }

    public class ResetPasswordModel
    {
        public string Token { get; set; }
        public string Email { get; set; }
        public string NewPassword { get; set; }
        public string userType { get; set; }
    }
}
