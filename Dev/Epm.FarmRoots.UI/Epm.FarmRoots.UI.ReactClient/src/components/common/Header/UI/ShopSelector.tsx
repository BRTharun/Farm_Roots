import React from "react";

const ShopSelector: React.FC = () => {
  return (
    <div className="col-span-3 md:col-auto h-full shrink-0 w-full md:w-40 flex flex-col justify-center">
      <div className="flex items-center">
            <svg
          className="w-6 h-6 text-black-400 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2c3.866 0 7 3.134 7 7 0 4.418-5 9.333-7 11.333C10 18.333 5 13.418 5 9c0-3.866 3.134-7 7-7z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 11a3 3 0 100-6 3 3 0 000 6z"
          />
        </svg>
        <h2 className="text-xl md:text-base font-extrabold">
          19 minutes Delivery
        </h2>
      </div>
      <p className="text-lg md:text-xs">Hyderabad, Telangana, India</p>
    </div>
  );
};

export default ShopSelector;
