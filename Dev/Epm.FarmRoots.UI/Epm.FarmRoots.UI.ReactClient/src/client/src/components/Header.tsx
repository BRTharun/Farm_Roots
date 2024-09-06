import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#0078C2] text-white py-4 px-6 w-full">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">Farm Roots</h1>
      </div>
    </header>
  );
};

export default Header;