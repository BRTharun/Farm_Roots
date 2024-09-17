import React, { Suspense, lazy, useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addProduct, addPrice } from "../../utils/slices/newProduct";
import { AppDispatch } from "../../utils/store/store";
import { useNavigate } from "react-router-dom";
import "../../../index.css";
import Sidebar from "../../common/vendor/Sidebar";

const TopBar = lazy(() => import("../../common/vendor/TopBar"));

const AddProduct: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [productID, setProductID] = useState<number | null>(null);

    const formik = useFormik({
        initialValues: {
            productName: "",
            productType: "",
            shortDescription: "",
            fullDescription: "",
            productCondition: "",
            productTags: "",
            published: false,
            vendorId: 0,
            salePrice: 0,
            mrp: 0,
            specialPrice: 0,
            specialPriceFromDate: "",
            specialPriceToDate: "",
            discount: 0,
            productCost: 0,
            isBuyButtonDisabled: false,
        },
        validationSchema: Yup.object({
            productName: Yup.string().required("Required"),
            productType: Yup.string().required("Required"),
            shortDescription: Yup.string().required("Required"),
            fullDescription: Yup.string().required("Required"),
            productCondition: Yup.string().required("Required"),
            productTags: Yup.string().required("Required"),
            vendorId: Yup.number().required("Required"),
            salePrice: Yup.number().required("Required"),
            mrp: Yup.number().required("Required"),
            productCost: Yup.number().required("Required"),
        }),
        onSubmit: async (values) => {
            const tagsArray = values.productTags.split(",").map((tag) => tag.trim());

            const product = {
                productName: values.productName,
                productType: values.productType,
                shortDescription: values.shortDescription,
                fullDescription: values.fullDescription,
                productCondition: values.productCondition,
                productTags: tagsArray,
                vendorId: values.vendorId,
                published: values.published,
            };

            try {
                const productResponse = await dispatch(addProduct(product)).unwrap();
                setProductID(productResponse.productId);

                const price = {
                    salePrice: values.salePrice,
                    mrp: values.mrp,
                    specialPrice: values.specialPrice,
                    specialPriceFromDate: "2024-09-16T04:09:24.582Z",
                    specialPriceToDate: "2024-09-19T04:09:24.582Z",
                    discount: values.discount,
                    productCost: values.productCost,
                    isBuyButtonDisabled: values.isBuyButtonDisabled,
                    productId: productResponse.productId,
                };

                await dispatch(addPrice(price)).unwrap();
                navigate("/my-products");
            } catch (error) {
                console.error("Failed to add product and price", error);
            }
        }
    });

    return (
        <div className="flex flex-col md:flex-row">
            <div className="bg-gray-800 p-4 text-white fixed">
                <Sidebar />
            </div>
            <div className="md:ml-64 mt-12 w-full">
                <Suspense fallback={<div>Loading...</div>}>
                    <TopBar />
                </Suspense>
                <div className="mt-12 p-2">
                    <h1 className="text-2xl font-bold mb-6">Add Product</h1>
                    <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="productName">Product Name</label>
                                <input
                                    id="productName"
                                    name="productName"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.productName}
                                />
                                {formik.touched.productName && formik.errors.productName ? (
                                    <div>{formik.errors.productName}</div>
                                ) : null}
                            </div>

                            <div>
                                <label htmlFor="productType">Product Type</label>
                                <input
                                    id="productType"
                                    name="productType"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.productType}
                                />
                                {formik.touched.productType && formik.errors.productType ? (
                                    <div>{formik.errors.productType}</div>
                                ) : null}
                            </div>

                            <div>
                                <label htmlFor="shortDescription">Short Description</label>
                                <input
                                    id="shortDescription"
                                    name="shortDescription"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.shortDescription}
                                />
                                {formik.touched.shortDescription && formik.errors.shortDescription ? (
                                    <div>{formik.errors.shortDescription}</div>
                                ) : null}
                            </div>

                            <div>
                                <label htmlFor="fullDescription">Full Description</label>
                                <input
                                    id="fullDescription"
                                    name="fullDescription"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.fullDescription}
                                />
                                {formik.touched.fullDescription && formik.errors.fullDescription ? (
                                    <div>{formik.errors.fullDescription}</div>
                                ) : null}
                            </div>

                            <div>
                                <label htmlFor="productCondition">Product Condition</label>
                                <input
                                    id="productCondition"
                                    name="productCondition"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.productCondition}
                                />
                                {formik.touched.productCondition && formik.errors.productCondition ? (
                                    <div>{formik.errors.productCondition}</div>
                                ) : null}
                            </div>

                            <div>
                                <label htmlFor="productTags">Product Tags (comma-separated)</label>
                                <input
                                    id="productTags"
                                    name="productTags"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.productTags}
                                />
                                {formik.touched.productTags && formik.errors.productTags ? (
                                    <div>{formik.errors.productTags}</div>
                                ) : null}
                            </div>

                            <div>
                                <label htmlFor="vendorId">Vendor ID</label>
                                <input
                                    id="vendorId"
                                    name="vendorId"
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.vendorId}
                                />
                                {formik.touched.vendorId && formik.errors.vendorId ? (
                                    <div>{formik.errors.vendorId}</div>
                                ) : null}
                            </div>

                            <div>
                                <label htmlFor="published">
                                    <input
                                        id="published"
                                        name="published"
                                        type="checkbox"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        checked={formik.values.published}
                                    />
                                    Published
                                </label>
                            </div>

                            <div>
                                <label htmlFor="salePrice">Sale Price</label>
                                <input
                                    id="salePrice"
                                    name="salePrice"
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.salePrice}
                                />
                                {formik.touched.salePrice && formik.errors.salePrice ? (
                                    <div>{formik.errors.salePrice}</div>
                                ) : null}
                            </div>

                            <div>
                                <label htmlFor="mrp">MRP</label>
                                <input
                                    id="mrp"
                                    name="mrp"
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.mrp}
                                />
                                {formik.touched.mrp && formik.errors.mrp ? (
                                    <div>{formik.errors.mrp}</div>
                                ) : null}
                            </div>

                            <div>
                                <label htmlFor="specialPrice">Special Price</label>
                                <input
                                    id="specialPrice"
                                    name="specialPrice"
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.specialPrice}
                                />
                                {formik.touched.specialPrice && formik.errors.specialPrice ? (
                                    <div>{formik.errors.specialPrice}</div>
                                ) : null}
                            </div>

                            <div>
                                <label htmlFor="specialPriceFromDate">Special Price From Date</label>
                                <input
                                    id="specialPriceFromDate"
                                    name="specialPriceFromDate"
                                    type="date"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.specialPriceFromDate}
                                />
                                {formik.touched.specialPriceFromDate && formik.errors.specialPriceFromDate ? (
                                    <div>{formik.errors.specialPriceFromDate}</div>
                                ) : null}
                            </div>

                            <div>
                                <label htmlFor="specialPriceToDate">Special Price To Date</label>
                                <input
                                    id="specialPriceToDate"
                                    name="specialPriceToDate"
                                    type="date"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.specialPriceToDate}
                                />
                                {formik.touched.specialPriceToDate && formik.errors.specialPriceToDate ? (
                                    <div>{formik.errors.specialPriceToDate}</div>
                                ) : null}
                            </div>

                            <div>
                                <label htmlFor="discount">Discount</label>
                                <input
                                    id="discount"
                                    name="discount"
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.discount}
                                />
                            </div>

                            <div>
                                <label htmlFor="productCost">Product Cost</label>
                                <input
                                    id="productCost"
                                    name="productCost"
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.productCost}
                                />
                                {formik.touched.productCost && formik.errors.productCost ? (
                                    <div>{formik.errors.productCost}</div>
                                ) : null}
                            </div>

                            <div>
                                <label htmlFor="isBuyButtonDisabled">
                                    <input
                                        id="isBuyButtonDisabled"
                                        name="isBuyButtonDisabled"
                                        type="checkbox"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        checked={formik.values.isBuyButtonDisabled}
                                    />
                                    Disable Buy Button
                                </label>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;