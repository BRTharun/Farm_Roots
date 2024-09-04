//------------------------------
// Import necessary libraries and hooks
//------------------------------
import React, { Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addProduct } from "../../utils/productsSlice";
import { AppDispatch } from "../../utils/store";


//------------------------------
// Lazy load the TopBar component
//------------------------------
const TopBar = lazy(() => import("./TopBar"));

//------------------------------
// Validation schema using Yup
//------------------------------
const validationSchema = Yup.object({
    productName: Yup.string().required("Name is required"),
    productCategory: Yup.string().required("Category is required"),
    productImage: Yup.string()
        .url("Invalid URL format")
        .required("Image URL is required"),
    productDescription: Yup.string().required("Description is required"),
    productStock: Yup.number()
        .required("Stock is required")
        .min(1, "Stock cannot be less than one"),
    productSale_Price: Yup.number()
        .required("Sale's Price is required")
        .min(1, "Sale's Price cannot be less than one"),
    productMrp: Yup.number()
        .required("Mrp Price is required")
        .min(1, "Mrp Price cannot be less than one")
        .max(
            Yup.ref("productSale_Price"),
            "Mrp Price cannot be greater than Regular Price"
        ),
});

//------------------------------
// List of product categories
//------------------------------
const categories = ["Fruits", "Vegetables", "Groceries", "Meat"];

const AddProduct: React.FC = () => {
    //------------------------------
    // Dispatch hook from Redux store
    //------------------------------
    const dispatch = useDispatch<AppDispatch>();

    //------------------------------
    // Formik initialization
    //------------------------------
    const formik = useFormik({
        initialValues: {
            productName: "",
            productCategory: "",
            productImage: "",
            productDescription: "",
            productStock: 0,
            productSale_Price: 0,
            productMrp: 0,
        },
        validationSchema,
        onSubmit: async (values) => {
            const product = {
                ...values,
            };

            //------------------------------
            // Dispatch addProduct action
            //------------------------------
            await dispatch(addProduct(product));
            
        },
    });

    return (
        <div className="flex flex-col md:flex-row">
            {/* 
            ------------------------------
            // Fixed sidebar or header (not implemented here)
            ------------------------------
            */}
            <div className="bg-gray-800 p-4 text-white fixed"></div>
            <div className="md:ml-64 mt-12 w-full">
                {/* 
                ------------------------------
                // Suspense for lazy-loaded TopBar
                ------------------------------
                */}
                <Suspense fallback={<ShimmerEffect />}>
                    <TopBar />
                </Suspense>
                <div className="mt-12 p-2">
                    <h1 className="text-2xl font-bold mb-6">Add Product</h1>
                    {formik.isSubmitting ? (
                        <ShimmerEffect />
                    ) : (
                        <form
                            onSubmit={formik.handleSubmit}
                            className="bg-white mt-13 p-6 rounded-lg shadow-md"
                        >
                            {/* 
                            ------------------------------
                            // Form fields for product details
                            ------------------------------
                            */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <label className="block">
                                    <span className="text-gray-700">Name</span>
                                    <input
                                        type="text"
                                        name="productName"
                                        value={formik.values.productName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    {formik.touched.productName &&
                                    formik.errors.productName ? (
                                        <div className="text-red-500 text-sm mt-1">
                                            {formik.errors.productName}
                                        </div>
                                    ) : null}
                                </label>
                                <label className="block">
                                    <span className="text-gray-700">
                                        Category
                                    </span>
                                    <select
                                        name="productCategory"
                                        value={formik.values.productCategory}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        <option
                                            value=""
                                            label="Select category"
                                        />
                                        {categories.map((category) => (
                                            <option
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                    {formik.touched.productCategory &&
                                    formik.errors.productCategory ? (
                                        <div className="text-red-500 text-sm mt-1">
                                            {formik.errors.productCategory}
                                        </div>
                                    ) : null}
                                </label>
                                <label className="block">
                                    <span className="text-gray-700">
                                        Image URL
                                    </span>
                                    <input
                                        type="text"
                                        name="productImage"
                                        value={formik.values.productImage}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    {formik.touched.productImage &&
                                    formik.errors.productImage ? (
                                        <div className="text-red-500 text-sm mt-1">
                                            {formik.errors.productImage}
                                        </div>
                                    ) : null}
                                </label>
                                <label className="block md:col-span-2">
                                    <span className="text-gray-700">
                                        Description
                                    </span>
                                    <textarea
                                        name="productDescription"
                                        value={formik.values.productDescription}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        rows={4}
                                    />
                                    {formik.touched.productDescription &&
                                    formik.errors.productDescription ? (
                                        <div className="text-red-500 text-sm mt-1">
                                            {formik.errors.productDescription}{" "}
                                        </div>
                                    ) : null}
                                </label>
                                <label className="block">
                                    <span className="text-gray-700">Stock</span>
                                    <input
                                        type="number"
                                        name="productStock"
                                        value={formik.values.productStock}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    {formik.touched.productStock &&
                                    formik.errors.productStock ? (
                                        <div className="text-red-500 text-sm mt-1">
                                            {formik.errors.productStock}
                                        </div>
                                    ) : null}
                                </label>

                                <label className="block">
                                    <span className="text-gray-700">
                                        Sale's Price
                                    </span>
                                    <input
                                        type="number"
                                        name="productSale_Price"
                                        value={formik.values.productSale_Price}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    {formik.touched.productSale_Price &&
                                    formik.errors.productSale_Price ? (
                                        <div className="text-red-500 text-sm mt-1">
                                            {formik.errors.productSale_Price}
                                        </div>
                                    ) : null}
                                </label>
                                <label className="block">
                                    <span className="text-gray-700">MRP</span>
                                    <input
                                        type="number"
                                        name="productMrp"
                                        value={formik.values.productMrp}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    {formik.touched.productMrp &&
                                    formik.errors.productMrp ? (
                                        <div className="text-red-500 text-sm mt-1">
                                            {formik.errors.productMrp}
                                        </div>
                                    ) : null}
                                </label>
                            </div>
                            {/* 
                            ------------------------------
                            // Submit button for the form
                            ------------------------------
                            */}
                            <button
                                type="submit"
                                className="mt-6 w-full md:w-auto bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                            >
                                Add Product
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

//------------------------------
// Shimmer Effect Component
//------------------------------
const ShimmerEffect: React.FC = () => (
    <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded mb-4" />
        <div className="h-4 bg-gray-200 rounded mb-4" />
        <div className="h-4 bg-gray-200 rounded mb-4" />
    </div>
);

export default AddProduct;
