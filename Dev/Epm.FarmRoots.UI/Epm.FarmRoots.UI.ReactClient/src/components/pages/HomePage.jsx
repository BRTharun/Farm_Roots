import React from "react";
import PageWrapper from "../Wrapper & Cards/PageWrapper";
import TopBanner from "../common/HomePage/UI/TopBanner";
import MainCategoryContainer from "../common/HomePage/MainCategoryContainer";
import ProductCarousel from "../common/HomePage/ProductCarousel";
import { useSelector } from "react-redux";

function Homepage() {
  const mainCategoryList = useSelector((state) => state.mainCategorySlice);

  return (
    <PageWrapper className="p-2">
      <TopBanner />
      <MainCategoryContainer />
    </PageWrapper>
  );
}

export default Homepage;