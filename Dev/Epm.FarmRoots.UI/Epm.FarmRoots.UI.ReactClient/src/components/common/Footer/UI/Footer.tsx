import React from "react";
// import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin } from "react-icons/bs";

// Define types for links and social media
interface Link {
  id: number;
  title: string;
  route: string;
}

type FooterUsefulLinks = Link[][];

// interface SocialMediaType {
//   id: number;
//   title: string;
//   route: string;
//   icon: React.ComponentType;
// }

// Define data for footer links and social media
const footerUsefulLinks: FooterUsefulLinks = [
  [
    { id: 1, title: "About", route: "" },
    { id: 2, title: "Careers", route: "" },
    { id: 3, title: "Blog", route: "" },
    { id: 4, title: "Press", route: "" },
    { id: 5, title: "Lead", route: "" },
    { id: 6, title: "Value", route: "" },
  ],
  [
    { id: 1, title: "Privacy", route: "" },
    { id: 2, title: "Terms", route: "" },
    { id: 3, title: "FAQs", route: "" },
    { id: 4, title: "Security", route: "" },
    { id: 5, title: "Mobile", route: "" },
    { id: 6, title: "Contact", route: "" },
  ],
  [
    { id: 1, title: "Partner", route: "" },
    { id: 2, title: "Express", route: "" },
    { id: 3, title: "Seller", route: "" },
    { id: 4, title: "Spotlight", route: "" },
    { id: 5, title: "Warehouse", route: "" },
    { id: 6, title: "Deliver", route: "" },
  ],
];

const categoriesData: FooterUsefulLinks = [
  [
    { id: 1, title: "Vegetables & Fruits", route: "" },
    { id: 2, title: "Cold Drinks & Juices", route: "" },
    { id: 3, title: "Bakery & Biscuits", route: "" },
    { id: 4, title: "Dry Fruits, Masala & Oil", route: "" },
    { id: 5, title: "Paan Corner", route: "" },
    { id: 6, title: "Pharma & Wellness", route: "" },
    { id: 7, title: "Personal Care", route: "" },
  ],
  [
    { id: 1, title: "Dairy & Breakfast", route: "" },
    { id: 2, title: "Instant & Frozen Food", route: "" },
    { id: 3, title: "Sweet Tooth", route: "" },
    { id: 4, title: "Sauces & Spreads", route: "" },
    { id: 5, title: "Organic & Premium", route: "" },
    { id: 6, title: "Cleaning Essentials", route: "" },
    { id: 7, title: "Ice Creams & Frozen Desserts", route: "" },
  ],
  [
    { id: 1, title: "Munchies", route: "" },
    { id: 2, title: "Tea, Coffee & Health Drinks", route: "" },
    { id: 3, title: "Atta, Rice & Dal", route: "" },
    { id: 4, title: "Chicken, Meat & Fish", route: "" },
    { id: 5, title: "Baby Care", route: "" },
    { id: 6, title: "Home & Office", route: "" },
    { id: 7, title: "Pet Care", route: "" },
  ],
];

// const socialMedias: SocialMediaType[] = [
//   { id: 1, icon: BsFacebook, title: "Facebook", route: "" },
//   { id: 2, icon: BsTwitter, title: "Twitter", route: "" },
//   { id: 3, icon: BsInstagram, title: "Instagram", route: "" },
//   { id: 4, icon: BsLinkedin, title: "Linkedin", route: "" },
// ];

const Footer: React.FC = () => {
  return (
    <div className="px-4 py-2 mt-10">
      {/* Useful Links Section */}
      <div className="grid grid-cols-2">
        <div>
          <h5 className="font-semibold text-xl">Useful Links</h5>
          <div className="grid grid-cols-3 mt-3">
            {footerUsefulLinks.map((column, columnIndex) => (
              <div key={columnIndex} className="text-[#666] space-y-2">
                {column.map((link) => (
                  <div key={link.id}>{link.title}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Categories Section */}
        <div>
          <h5 className="font-semibold text-xl">Categories</h5>
          <div className="grid grid-cols-3 mt-3">
            {categoriesData.map((column, columnIndex) => (
              <div key={columnIndex} className="text-[#666] space-y-2">
                {column.map((link) => (
                  <div key={link.id}>{link.title}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Links and App Download */}
      <div className="flex justify-between items-center mt-5">
        <p className="w-96 text-[#666]">
          © Farm Roots, 2024
        </p>

        <div className="flex space-x-2 items-center">
          <p className="text-[#666] font-semibold">Download App</p>
          <div className="relative w-36 h-12">
            <img src="/android_download.png" alt="Android Download" />
          </div>
          <div className="relative w-36 h-12">
            <img src="/ios_download.png" alt="iOS Download" />
          </div>
        </div>

        {/* <div className="flex space-x-4">
          {socialMedias.map((socialMedia) => {
            const Icon = socialMedia.icon;
            return (
              <div key={socialMedia.id}>
                <Icon className="w-8 h-8 text-[#1F1F1F]" />
              </div>
            );
          })}
        </div> */}
      </div>

      {/* Disclaimer */}
      <div className="mt-5">
        <p className="text-[#666]">
          &quot;Farm Roots&quot; is owned and managed by &quot;Farm Roots
          Commerce Private Limited&quot; and is not related, linked or interconnected in any manner
          with &quot; which is a real estate services business
          operated by &quot;Epam Systems&quot;.
        </p>
      </div>
    </div>
  );
};

export default Footer;
