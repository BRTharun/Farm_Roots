import React, { useContext } from "react";
import SubCategory from "./UI/SubCategory";
import ProductPageContext from "../context/ProductPageContext";

function SubCategoryContainer() {
  const { subCategoryList } = useContext(ProductPageContext);

  // Log the subCategoryList to verify its structure
  // console.log("subCategoryList:", subCategoryList);

  return (
    subCategoryList && Array.isArray(subCategoryList) && (
      <div className="hideScrollbar sticky h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)] top-0 bottom-0 left-0 shrink-0 flex-col w-40 md:w-80 overflow-scroll border bg-gray-200">
        {subCategoryList.map((subCategory) => (
          <SubCategory
            key={subCategory.subCategoryId}
            id={subCategory.subCategoryId}
            name={subCategory.subCategoryName}
            image={subCategory.image}
          />
        ))}
      </div>
    )
  );
}

export default SubCategoryContainer;
