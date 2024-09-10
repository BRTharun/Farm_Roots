import React from "react";
import { NavLink } from "react-router-dom";

interface MainCategoryProps {
    name: string;
    image: string;
    id: number | string;
    firstSubCategoryId: number | string;
};

const MainCategory: React.FC<MainCategoryProps> = ({
    name, 
    image,
    id, 
    firstSubCategoryId
}) => {
    return (
        <NavLink 
            to={`/pl/${id}/${firstSubCategoryId}`}
            className="block w-full"
        >
            <div className="hover:bg-green-100 transition-all bg-white shrink-0 w-52 h-44 gap-3 flex flex-col justify-center items-center p-4 shadow-md rounded-md hover:shadow-lg transform hover:-translate-y-1">
                <img
                    className="w-24 h-24 object-cover object-center rounded-full" 
                    src={image}
                    alt={`${name} category`}
                />
                <p className="text-center text-lg font-bold text-gray-800 tracking-wide">
                    {name}
                </p>
            </div>
        </NavLink>
    );
}

export default MainCategory;
