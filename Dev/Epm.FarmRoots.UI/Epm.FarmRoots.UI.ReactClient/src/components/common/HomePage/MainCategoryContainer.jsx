import React, { useEffect } from "react";
import MainCategory from "./UI/MainCategory";
import { useSelector, useDispatch } from "react-redux";
import { setMainCategoryAct } from "../../store/Action/mainCategoryAction";

function MainCategoryContainer() {
  const dispatch = useDispatch();
  const mainCategoryList = useSelector((state) => state.mainCategorySlice);

  useEffect(() => {
    dispatch(setMainCategoryAct()); // Fetch data when component mounts
  }, [dispatch]);


  return (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
  {mainCategoryList.map((mainCategory) => (
      <MainCategory
        key={mainCategory.categoryId}
        name={mainCategory.categoryName}
        id={mainCategory.categoryId}
        image={mainCategory.image}
      />
  ))}
</div>

  );
}

export default MainCategoryContainer;
