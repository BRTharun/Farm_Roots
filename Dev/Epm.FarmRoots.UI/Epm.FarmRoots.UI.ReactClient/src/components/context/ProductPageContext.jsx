import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { SUB_CATEGORY_API_URL, PRODUCT_API_URL } from "../services/api";

const ProductPageContext = React.createContext({
  subCategoryList: [],
  productsList: [],
});

const ProductPageContextProvider = ({ setLoader, children, setIsPresent }) => {
  const { mainCategoryId } = useParams();
  
  // Fetching subcategories
  const { data: subCategoryData, error: subCategoryError } = useFetch(
    SUB_CATEGORY_API_URL(mainCategoryId),
    false,
    setLoader,
    (data) => {
      const resultArray = data?.result || []; // Extract array from result field
      if (Array.isArray(resultArray)) {
        setIsPresent(resultArray.length > 0);
      } else {
        console.error("Expected an array of subcategories");
        setIsPresent(false);
      }
    }
  );

  // Fetching products
  const { data: productsData, error: productsError } = useFetch(
    PRODUCT_API_URL(mainCategoryId)
  );

  // Ensure subCategoryList and productsList are always arrays
  const subCategoryList = Array.isArray(subCategoryData?.result) ? subCategoryData.result : [];
  const productsList = Array.isArray(productsData?.result) ? productsData.result : [];


  return (
    <ProductPageContext.Provider value={{ subCategoryList, productsList }}>
      {children}
    </ProductPageContext.Provider>
  );
};

export { ProductPageContextProvider };
export default ProductPageContext;
