import React, { ReactNode } from "react";

interface BlurWrapperProps {
  className?: string;
  children: ReactNode;
}

const BlurWrapper: React.FC<BlurWrapperProps> = ({ className, children }) => {
  return (
    <div
      className={`${className ? className : ""} z-50 blurWrapper fixed top-0 left-0 w-screen h-screen`}
    >
      {children}
    </div>
  );
};

export default BlurWrapper;
