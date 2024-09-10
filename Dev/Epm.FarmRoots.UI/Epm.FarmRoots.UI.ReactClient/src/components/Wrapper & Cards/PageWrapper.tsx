import React, { ReactNode } from "react";
import LoadingPage from "../UI/LoadingPage";



interface PageWrapperProps {
    className?: string;
    children: ReactNode;
    loader?: boolean;
};


const PageWrapper: React.FC<PageWrapperProps> = ({ className, children, loader }) => {
    return !loader ? (
        <div
            className={
                `${
                    className ? className : ""
                } w-full lg:w-[85%] mx-auto flex flex-col justify-center`
            }
            >
                {children}
            </div>
    ) : (
        <LoadingPage className=" h-[calc(100vh-10rem)]" />
    );
};


export default PageWrapper;