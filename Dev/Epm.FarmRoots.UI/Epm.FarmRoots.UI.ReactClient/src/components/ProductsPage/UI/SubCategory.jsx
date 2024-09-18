import { NavLink, useParams } from "react-router-dom";

function SubCategory({ id, image, name }) {
  const { subCategoryId } = useParams();

  // Determine if the current subcategory is active based on the route parameter
  const isActive = id === parseInt(subCategoryId, 10); // Ensure type consistency

  // Create the image URL for base64 data
  const imageUrl = `data:image/png;base64,${image}`; // Assuming the image is a PNG. Adjust MIME type as necessary

  // Conditional styling for active and non-active states
  return (
    <NavLink
      to={`/pl/${id}`}
      className={`${
        isActive ? "bg-green-200 border-l-8 border-l-green-500" : "bg-white"
      } hover:bg-green-200 transition-all cursor-pointer flex flex-col md:flex-row items-center border-b px-3 py-3 md:py-0 md:gap-4`}
    >
      <img
        className={`${
          isActive ? "rounded-2xl" : "rounded-none"
        } w-20 h-20 transition-all object-cover object-center`}
        src={imageUrl} // Use the base64 image URL
        alt={name} // Use name for accessibility
      />
      <p className="text-sm font-medium">{name}</p>
    </NavLink>
  );
}

export default SubCategory;
