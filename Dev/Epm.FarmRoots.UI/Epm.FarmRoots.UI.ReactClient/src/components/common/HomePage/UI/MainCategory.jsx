import React from "react";
import { NavLink } from "react-router-dom";
// Importing the sample image, you can remove this if not needed
import sample from "../../../../assets/images/samplefruits.webp";

function MainCategory({ name, image, id }) {
  const imageUrl = `data:image/png;base64,${image}`; // Base64 image URL
  console.log(name, id, "From the maincategory page");
  return (
    <NavLink to={`/pl/${id}`} className="block w-full">
      <div className="hover:bg-green-100 transition-all bg-white shrink-0 w-full sm:w-48 md:w-52 lg:w-60 h-auto max-w-xs mx-auto my-4 p-4 shadow-md rounded-md hover:shadow-lg transform hover:-translate-y-1">
        <div className="relative w-full h-36 mb-3">
          <img
            className="absolute inset-0 w-full h-full object-contain rounded-md"
            src={imageUrl}
            alt={`${name} category`}
          />
        </div>
        <p className="text-center text-md font-semibold text-gray-800 tracking-wide">
          {name}
        </p>
      </div>
    </NavLink>
  );
}

export default MainCategory;
