import React from "react";
import Loader from "./Loader"

interface LoadingPageProps {
  className?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ className }) => {
  return (
    <div data-testid="loading-page" className={`${className ? className : ""} flex justify-center items-center`}>
      <Loader className="text-9xl text-green-800" />
    </div>
  );
};

export default LoadingPage;
