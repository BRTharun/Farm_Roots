import React from "react";
import { NavLink } from "react-router-dom";

interface MainCategoryProps {
    name : string;
    image: string;
    id : number | string;
    firstSubCategoryId : number | string; // uncomment later
};

const MainCategory : React.FC<MainCategoryProps> = ({
    name, 
    image,
    id, 
    firstSubCategoryId
}) => {
    return (
        <NavLink to =  {`/pl/${id}/${firstSubCategoryId}`}>
            <div className="hover:bg-green-50 transition-all bg-white shrink-0 w-28 h-40 gap-3 flex flex-col justify-center items-center p-4">
                <img
                    className="w-20 object-cover object-center " 
                    src={image}
                    alt = {name}/>
                <p className="text-center text-md font-bold text-gray-700 tracking-wide">{name}</p>
            </div>
        </NavLink>
    );
}

export default MainCategory;