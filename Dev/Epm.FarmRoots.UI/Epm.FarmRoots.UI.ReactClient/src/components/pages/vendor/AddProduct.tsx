import React, { Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addProduct } from "../../utils/products";
import { AppDispatch } from "../../utils/store";

// Lazy load the TopBar component
const TopBar = lazy(() => import("./TopBar"));

// Validation schema using Yup
const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    category: Yup.string().required("Category is required"),
    image: Yup.string()
        .url("Invalid URL format")
        .required("Image URL is required"),
    description: Yup.string().required("Description is required"),
    stock: Yup.number()
        .required("Stock is required")
        .min(1, "Stock cannot be less than one"),
    tags: Yup.string(),
    regularPrice: Yup.number()
        .required("Regular Price is required")
        .min(1, "Regular Price cannot be less than one"),
    salePrice: Yup.number()
        .required("Sale Price is required")
        .min(1, "Sale Price cannot be less than one")
        .max(
            Yup.ref("regularPrice"),
            "Sale Price cannot be greater than Regular Price"
        ),
    publish: Yup.boolean(),
});

const AddProduct: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const formik = useFormik({
        initialValues: {
            name: "",
            category: "",
            image: "",
            description: "",
            stock: 0,
            tags: "",
            regularPrice: 0,
            salePrice: 0,
            publish: false,
        },
        validationSchema,
        onSubmit: (values) => {
            const tagsArray = values.tags.split(",").map((tag) => tag.trim());
            const product = {
                ...values,
                tags: tagsArray,
            };
            dispatch(addProduct(product));
        },
    });

    return (
        <div className="flex flex-col md:flex-row">
            <div className="bg-gray-800 p-4 text-white fixed">
                
            </div>
            <div className="md:ml-64 mt-12 w-full">
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <label className="block">
                                    <span className="text-gray-700">Name</span>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    {formik.touched.name &&
                                    formik.errors.name ? (
                                        <div className="text-red-500 text-sm mt-1">
                                            {formik.errors.name}
                                        </div>
                                    ) : null}
                                </label>
                                <label className="block">
                                    <span className="text-gray-700">
                                        Category
                                    </span>
                                    <input
                                        type="text"
                                        name="category"
                                        value={formik.values.category}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    {formik.touched.category &&
                                    formik.errors.category ? (
                                        <div className="text-red-500 text-sm mt-1">
                                            {formik.errors.category}
                                        </div>
                                    ) : null}
                                </label>
                                <label className="block">
                                    <span className="text-gray-700">
                                        Image URL
                                    </span>
                                    <input
                                        type="text"
                                        name="image"
                                        value={formik.values.image}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    {formik.touched.image &&
                                    formik.errors.image ? (
                                        <div className="text-red-500 text-sm mt-1">
                                            {formik.errors.image}
                                        </div>
                                    ) : null}
                                </label>
                                <label className="block md:col-span-2">
                                    <span className="text-gray-700">
                                        Description
                                    </span>
                                    <textarea
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        rows={4}
                                    />
                                    {formik.touched.description &&
                                    formik.errors.description ? (
                                        <div className="text-red-500 text-sm mt-1">
                                            {formik.errors.description}
                                        </div>
                                    ) : null}
                                </label>
                                <label className="block">
                                    <span className="text-gray-700">Stock</span>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formik.values.stock}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    {formik.touched.stock &&
                                    formik.errors.stock ? (
                                        <div className="text-red-500 text-sm mt-1">
                                            {formik.errors.stock}
                                        </div>
                                    ) : null}
                                </label>
                                <label className="block">
                                    <span className="text-gray-700">
                                        Tags (comma-separated)
                                    </span>
                                    <input
                                        type="text"
                                        name="tags"
                                        value={formik.values.tags}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-gray-700">
                                        Regular Price
                                    </span>
                                    <input
                                        type="number"
                                        name="regularPrice"
                                        value={formik.values.regularPrice}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    {formik.touched.regularPrice &&
                                    formik.errors.regularPrice ? (
                                        <div className="text-red-500 text-sm mt-1">
                                            {formik.errors.regularPrice}
                                        </div>
                                    ) : null}
                                </label>
                                <label className="block">
                                    <span className="text-gray-700">
                                        Sale Price
                                    </span>
                                    <input
                                        type="number"
                                        name="salePrice"
                                        value={formik.values.salePrice}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    {formik.touched.salePrice &&
                                    formik.errors.salePrice ? (
                                        <div className="text-red-500 text-sm mt-1">
                                            {formik.errors.salePrice}
                                        </div>
                                    ) : null}
                                </label>
                                <label className="block md:col-span-2 flex items-center">
                                    <input
                                        type="checkbox"
                                        name="publish"
                                        checked={formik.values.publish}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="mr-2 rounded border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    <span className="text-gray-700">
                                        Publish
                                    </span>
                                </label>
                            </div>
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

// Shimmer Effect Component
const ShimmerEffect: React.FC = () => (
    <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded mb-4 w-full"></div>
        <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
        <div className="h-6 bg-gray-200 rounded mb-4 w-full"></div>
        <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded mb-4 w-full"></div>
    </div>
);

export default AddProduct;
