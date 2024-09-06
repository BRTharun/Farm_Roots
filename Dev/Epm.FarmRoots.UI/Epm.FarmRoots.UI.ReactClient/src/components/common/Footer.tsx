import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#060606] text-white py-4 px-6 w-full">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Farm Roots. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
