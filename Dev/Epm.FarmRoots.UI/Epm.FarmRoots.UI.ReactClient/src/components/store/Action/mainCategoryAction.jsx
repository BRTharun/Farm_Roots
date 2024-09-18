import axios from "axios";
import { CATEGORY_API_URL } from "../../services/api";
import { setMainCategory } from "../Reducer/mainCategorySlice";

export const setMainCategoryAct = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(CATEGORY_API_URL);
      console.log("Dispatching data:", data.result); 
      dispatch(setMainCategory(data.result)); // Make sure to use the correct path to the actual data
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };
};
