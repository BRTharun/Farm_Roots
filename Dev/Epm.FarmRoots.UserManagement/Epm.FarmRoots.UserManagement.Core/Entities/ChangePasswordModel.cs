namespace Epm.FarmRoots.UserManagement.Core.Entities
{
    public class ChangePasswordModel
    {
        public required string OldPassword { get; set; }
        public required string NewPassword { get; set; }
    }
}
