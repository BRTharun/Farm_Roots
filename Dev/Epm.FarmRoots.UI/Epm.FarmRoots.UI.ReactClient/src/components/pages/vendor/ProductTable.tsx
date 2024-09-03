import React from "react";
import Shimmer from "./Shimmer"; // Import the Shimmer component
import { Product } from "../../utils/products";

interface ProductTableProps {
    products: Product[];
    loading: boolean; // Add a loading prop to handle shimmer display
}

const ProductTable: React.FC<ProductTableProps> = ({ products, loading }) => {
    if (loading) {
        return <Shimmer />; // Display shimmer when loading
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Category</th>
                        <th className="p-2 text-left">Stock</th>
                        <th className="p-2 text-left">Regular Price</th>
                        <th className="p-2 text-left">Sale Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product._id} className="border-b border-gray-200">
                                <td className="p-2">{product.name}</td>
                                <td className="p-2">{product.category}</td>
                                <td className="p-2">{product.stock}</td>
                                <td className="p-2">${product.regularPrice.toFixed(2)}</td>
                                <td className="p-2">${product.salePrice.toFixed(2)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="p-2 text-center">No products found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
