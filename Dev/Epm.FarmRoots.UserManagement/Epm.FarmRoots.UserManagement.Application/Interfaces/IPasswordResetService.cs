namespace Epm.FarmRoots.UserManagement.Application.Interfaces
{
    //public interface IPasswordResetService
    //{
    //    Task<bool> SendResetLinkAsync(string email);
    //    Task<bool> ResetPasswordAsync(string token, string email, string newPassword);
    //}

    public interface IPasswordResetService
    {
        Task<bool> SendResetLinkAsync(string email, string userType);
        Task<bool> ResetPasswordAsync(string token, string email, string newPassword, string userType);
    }
}
