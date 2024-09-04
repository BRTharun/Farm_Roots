import React from "react";
import Shimmer from "./Shimmer"; // Import the Shimmer component for loading placeholder
import { Product } from "../../utils/productsSlice"; // Import Product type from productsSlice

//------------------------------
// Interface for ProductTable props
//------------------------------
interface ProductTableProps {
    products: Product[]; // List of products to display in the table
    loading: boolean; // Boolean flag to indicate loading state
}

//------------------------------
// ProductTable Component
//------------------------------
const ProductTable: React.FC<ProductTableProps> = ({ products, loading }) => {
    //------------------------------
    // Conditional rendering based on loading state
    //------------------------------
    if (loading) {
        return <Shimmer />; // Display shimmer effect while data is loading
    }

    return (
        <div className="overflow-x-auto">
            {products.length > 0 ? (
                //------------------------------
                // Table displaying products
                //------------------------------
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-200">
                            {/* 
                            ------------------------------
                            // Table headers
                            ------------------------------
                            */}
                            <th className="p-2 text-left">Name</th>
                            <th className="p-2 text-left">Category</th>
                            <th className="p-2 text-left">Stock</th>
                            <th className="p-2 text-left">Regular Price</th>
                            <th className="p-2 text-left">Sale Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 
                        ------------------------------
                        // Render each product as a row in the table
                        ------------------------------
                        */}
                        {products.map((product) => (
                            <tr
                                key={product._id} // Unique key for each row based on product ID
                                className="border-b border-gray-200"
                            >
                                <td className="p-2">{product.productName}</td>
                                <td className="p-2">
                                    {product.productCategory}
                                </td>
                                <td className="p-2">{product.productStock}</td>
                                <td className="p-2">
                                    ${product.productSale_Price}
                                </td>
                                <td className="p-2">${product.productMrp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                //------------------------------
                // Message and image when no products are found
                //------------------------------
                <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-300 rounded-lg shadow-md">
                    <img
                        src="https://cdn.dribbble.com/users/3512533/screenshots/14168376/web_1280___8_4x.jpg"
                        alt="No Products"
                        className="w-64 h-64 object-cover rounded-lg"
                    />
                    <h2 className="mt-4 text-xl font-semibold text-gray-800">
                        No Products Found
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Please try again later.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ProductTable;
