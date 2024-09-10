import React from "react";
import {Link} from "react-router-dom";


const Brand: React.FC = () => {
    return (
        <Link to="/">
            <div className="md:flex border-r w-60 h-full justify-center items-center cursor-pointer">
                <h1 className="text-4xl font-bold">
                    <span className="text-green-800">Farm</span>
                    <span className="text-black">Roots</span>
                </h1>
            </div>
        </Link>
    )
};


export default Brand;