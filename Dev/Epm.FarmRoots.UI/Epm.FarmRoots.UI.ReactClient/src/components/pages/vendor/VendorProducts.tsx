import React, { useEffect, Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../utils/store";
import { fetchProducts } from "../../utils/productsSlice";

// Lazy load ProductTable component to improve initial load time
const ProductTable = React.lazy(() => import("./ProductTable"));

//------------------------------
// Shimmer Component: Placeholder for loading state
//------------------------------
const Shimmer = () => (
    <div className="animate-pulse">
        <div className="flex justify-between items-center mb-4">
            {/* Placeholder for table headers */}
            <div className="h-6 bg-slate-200 rounded w-1/4"></div>
            <div className="h-6 bg-slate-200 rounded w-1/4"></div>
            <div className="h-6 bg-slate-200 rounded w-1/4"></div>
            <div className="h-6 bg-slate-200 rounded w-1/4"></div>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                        {/* Table headers */}
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Category</th>
                        <th className="p-2 text-left">Stock</th>
                        <th className="p-2 text-left">Regular Price</th>
                        <th className="p-2 text-left">Sale Price</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Placeholder for table rows */}
                    <tr>
                        <td className="p-2 bg-slate-200 h-10"></td>
                        <td className="p-2 bg-slate-200 h-10"></td>
                        <td className="p-2 bg-slate-200 h-10"></td>
                        <td className="p-2 bg-slate-200 h-10"></td>
                        <td className="p-2 bg-slate-200 h-10"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

//------------------------------
// VendorProducts Component: Main component for displaying products
//------------------------------
const VendorProducts: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.product.products);
    const [loading, setLoading] = useState(true); // Initialize loading state

    useEffect(() => {
        //------------------------------
        // Fetch products and update loading state
        //------------------------------
        dispatch(fetchProducts())?.then(() => setLoading(false));
    }, [dispatch]);

    return (
        <div className="flex flex-col md:flex-row">
            {/* Fixed sidebar or additional content (e.g., navigation) */}
            <div className="bg-gray-800 p-4 text-white fixed"></div>
            <div className="md:ml-64 mt-12 w-full">
                <div className="mt-12 p-2">
                    <div className="container mx-auto">
                        <div className="flex justify-between items-center mb-4">
                            {/* Page header */}
                            <h1 className="text-2xl font-bold">Product List</h1>
                        </div>
                        {/* Suspense for lazy-loaded ProductTable with Shimmer fallback */}
                        <Suspense fallback={<Shimmer />}>
                            <ProductTable
                                products={products}
                                loading={loading}
                            />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorProducts;
