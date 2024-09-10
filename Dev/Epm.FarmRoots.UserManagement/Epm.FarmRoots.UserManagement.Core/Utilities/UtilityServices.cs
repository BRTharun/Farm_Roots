namespace Epm.FarmRoots.UserManagement.Core.Utilities
{
    public static class UtilityServices
    {
        public static bool IsBase64String(string base64)
        {
            if (string.IsNullOrWhiteSpace(base64))
                return false;

            Span<byte> buffer = new Span<byte>(new byte[base64.Length]);
            return Convert.TryFromBase64String(base64, buffer, out int bytesParsed);
        }

        public static string EncodeToBase64(string plainText)
        {
            if (plainText == null) return null;
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return Convert.ToBase64String(plainTextBytes);
        }

        public static string DecodeFromBase64(string base64EncodedData)
        {
            if (!IsBase64String(base64EncodedData))
                throw new ArgumentException("Input is not a valid Base-64 encoded string.");

            var base64EncodedBytes = Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }

        public static string DecodePassword(string password)
        {
            return password;
        }

    }
}
