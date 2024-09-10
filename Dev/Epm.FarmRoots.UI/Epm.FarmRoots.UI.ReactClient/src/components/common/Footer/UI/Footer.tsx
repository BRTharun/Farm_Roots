import React from "react";
import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin } from "react-icons/bs";

// Define types for links and social media
interface Link {
  id: number;
  title: string;
  route: string;
}

type FooterUsefulLinks = Link[][];

interface SocialMediaType {
  id: number;
  title: string;
  route: string;
  icon: React.ComponentType<{ className?: string }>; // Ensures `className` is a valid prop
}

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
    { id: 4, title: "Mobile", route: "" },
    { id: 5, title: "Contact", route: "" },
  ],
  [
    { id: 1, title: "Partner", route: "" },
    { id: 2, title: "Express", route: "" },
    { id: 3, title: "Seller", route: "" },
    { id: 4, title: "Warehouse", route: "" },
    { id: 5, title: "Deliver", route: "" },
  ],
];

const categoriesData: FooterUsefulLinks = [
  [
    { id: 1, title: "Fruits", route: "" },
    { id: 2, title: "Vegetables", route: "" },
    { id: 3, title: "Meat, Fish and Eggs", route: "" },
    { id: 4, title: "Dairy Products", route: "" },
    { id: 5, title: "Cool drinks and juices", route: "" },
    { id: 6, title: "Condiments and Spices", route: "" },
    { id: 7, title: "Baked Goods", route: "" },
  ],
  [
    { id: 1, title: "Grains", route: "" },
    { id: 2, title: "Treats", route: "" },
    { id: 3, title: "Health and Wellness", route: "" },
    { id: 4, title: "Tea, coffee & more", route: "" },
    { id: 5, title: "Cleaning essentials", route: "" },
    { id: 6, title: "Body care", route: "" },
    { id: 7, title: "Other", route: "" },
    { id: 8, title: "Snacks", route: "" },
  ],
];

const socialMedias: SocialMediaType[] = [
  { id: 1, icon: BsFacebook, title: "Facebook", route: "" },
  { id: 2, icon: BsTwitter, title: "Twitter", route: "" },
  { id: 3, icon: BsInstagram, title: "Instagram", route: "" },
  { id: 4, icon: BsLinkedin, title: "Linkedin", route: "" },
];

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
          <div className="grid grid-cols-3 mt-3 cursor-pointer">
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

        <div className="flex space-x-4">
          {socialMedias.map((socialMedia) => {
            const Icon = socialMedia.icon;
            return (
              <div key={socialMedia.id}>
                <Icon className="w-8 h-8 text-[#1F1F1F]" />
              </div>
            );
          })}
        </div>
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
