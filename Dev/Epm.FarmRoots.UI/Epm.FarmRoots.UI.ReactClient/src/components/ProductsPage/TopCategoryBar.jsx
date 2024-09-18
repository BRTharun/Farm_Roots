import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMainCategoryAct } from "../store/Action/mainCategoryAction";
import { Link, useParams } from "react-router-dom";

function TopCategoryBar() {
  const dispatch = useDispatch();
  const mainCategoryList = useSelector((state) => state.mainCategorySlice); // Ensure this is fetching correctly
  const [showDropdown, setShowDropdown] = useState(false); // For controlling "More" dropdown
  const visibleCategoriesCount = 5; // Show only 5 categories at the top

  const { mainCategoryId } = useParams();

  useEffect(() => {
    dispatch(setMainCategoryAct()); // Fetch categories when component mounts
  }, [dispatch]);

  const handleMoreClick = () => {
    setShowDropdown(!showDropdown); // Toggle the dropdown on click
  };

  // Split categories into visible and hidden (for "More")
  const visibleCategories = mainCategoryList.slice(0, visibleCategoriesCount);
  const hiddenCategories = mainCategoryList.slice(visibleCategoriesCount);

  console.log("Main Category List:", mainCategoryList); // Debugging the fetched data

  return (
    <div className="hidden md:flex h-12 justify-center gap-10 sticky top-20 bg-white left-0 z-10 border-b shadow-md">
      {mainCategoryList.length > 0 ? (
        <>
          {/* Render visible categories */}
          {visibleCategories.map((category) => (
            <TopCategory
              key={category.categoryId}
              id={category.categoryId}
              name={category.categoryName}
              isActive={mainCategoryId === category.categoryId}
            />
          ))}

          {/* More Dropdown for hidden categories */}
          {hiddenCategories.length > 0 && (
            <div className="relative">
              <button
                onClick={handleMoreClick}
                className="px-4 flex items-center bg-white hover:bg-green-100 transition-all"
              >
                More
              </button>
              {showDropdown && (
                <div className="absolute top-full left-0 w-48 bg-white shadow-lg border z-50">
                  {hiddenCategories.map((category) => (
                    <Link
                      to={`/pl/${category.categoryId}`}
                      key={category.categoryId}
                      className="block px-4 py-2 hover:bg-green-100"
                    >
                      {category.categoryName}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <p>No categories available</p> // Show message when no categories are available
      )}
    </div>
  );
}

export default TopCategoryBar;

function TopCategory({ name, isActive, id }) {
  return (
    <Link
      to={`/pl/${id}`}
      className={`px-4 flex items-center ${
        isActive ? "bg-green-600 text-white" : "bg-white hover:bg-green-100"
      } transition-all`}
    >
      <p>{name}</p>
    </Link>
  );
}
