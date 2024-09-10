import React from "react";
import { BiLoaderCircle } from "react-icons/bi";

interface LoaderProps {
  className?: string; 
}

const Loader: React.FC<LoaderProps> = ({ className }) => {
  return (
    <div>
      <BiLoaderCircle className={`${className ? className : ""} animate-spin`} />
    </div>
  );
};

export default Loader;
