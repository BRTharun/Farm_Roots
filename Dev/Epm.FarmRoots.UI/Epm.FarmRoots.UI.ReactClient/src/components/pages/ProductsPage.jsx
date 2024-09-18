import React, { useState } from "react";
import PageWrapper from "../Wrapper & Cards/PageWrapper";
import SubCategoryContainer from "../ProductsPage/SubCategoryContainer";
import TopCategoryBar from "../ProductsPage/TopCategoryBar";
import TopSortBar from "../ProductsPage/TopSortBar";
import {ProductPageContextProvider} from "../context/ProductPageContext";

const ProductsPage = () => {
    const [isPresent, setIsPresent] = useState(false);
    const [loader, setLoader] = useState(true);

    return (
        <ProductPageContextProvider
            setLoader={setLoader}
            setIsPresent={setIsPresent}
        >
            <div>
                <TopCategoryBar />
                <PageWrapper loader={loader}>
                    {isPresent ? (
                        <div className="h-full flex w-full">
                            <SubCategoryContainer />
                            <div className="h-full w-full">
                                <TopSortBar />
                                {/* 
                                <ProductsContainer /> 
                                Commented out as requested
                                */}
                            </div>
                        </div>
                    ) : (
                        <div>
                            Not found
                        </div>
                    )}
                </PageWrapper>
            </div>
        </ProductPageContextProvider>
    );
};

export default ProductsPage;
