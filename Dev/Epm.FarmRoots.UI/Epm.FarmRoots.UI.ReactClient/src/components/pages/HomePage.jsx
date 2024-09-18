import React from "react";
import PageWrapper from "../Wrapper & Cards/PageWrapper";
import TopBanner from "../common/HomePage/UI/TopBanner";
import MainCategoryContainer from "../common/HomePage/MainCategoryContainer";
import ProductCarousel from "../common/HomePage/ProductCarousel";
import { useSelector } from "react-redux";

function Homepage() {
  const mainCategoryList = useSelector((state) => state.mainCategorySlice);
  // console.log(mainCategoryList);

  return (
    <PageWrapper className="p-2">
      <TopBanner />
      <MainCategoryContainer />
      {/* {mainCategoryList.map((mainCategory) => {
        return (
          <ProductCarousel
          key={mainCategory.categoryId} // Use categoryId as key
          firstSubCategoryId={firstSubCategoryId}
          title={mainCategory.categoryName} // Assuming name is categoryName
          mainCategoryId={mainCategory.categoryId} // Assuming id is categoryId
        />
        );
      })} */}
    </PageWrapper>
  );
}

export default Homepage;
