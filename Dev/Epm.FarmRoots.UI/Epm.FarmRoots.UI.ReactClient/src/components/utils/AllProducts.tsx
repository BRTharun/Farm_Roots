// src/components/Products.tsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { fetchProducts } from "./productsSlice";
//import { Product } from './types';

const AllProducts: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        products = [],
        loading = false,
        error = null,
    } = useSelector((state: RootState) => state.product || {});
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        <img
                            src={product.productImage}
                            alt={product.productName}
                            width="100"
                        />
                        <h2>{product.productName}</h2>
                        <p>{product.productDescription}</p>
                        <p>Price: ${product.productMrp}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllProducts;
