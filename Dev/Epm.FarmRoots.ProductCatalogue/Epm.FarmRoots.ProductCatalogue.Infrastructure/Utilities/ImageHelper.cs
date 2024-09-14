using System.IO;

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Utilities
{
    public static class ImageHelper
    {
        public static byte[] ImageToByteArray(string imagePath)
        {
            return File.ReadAllBytes(imagePath);
        }
    }
}