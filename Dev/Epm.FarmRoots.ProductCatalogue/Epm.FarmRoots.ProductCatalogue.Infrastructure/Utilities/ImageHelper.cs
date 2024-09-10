using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

namespace Epm.FarmRoots.ProductCatalogue.Infrastructure.Utilities
{
    public static class ImageHelper
    {
        public static string ImageToBase64(string imagePath, ImageFormat format)
        {
            using (Image image = Image.FromFile(imagePath))
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    image.Save(ms, format);
                    byte[] imageBytes = ms.ToArray();
                    return Convert.ToBase64String(imageBytes);
                }
            }
        }
    }
}
