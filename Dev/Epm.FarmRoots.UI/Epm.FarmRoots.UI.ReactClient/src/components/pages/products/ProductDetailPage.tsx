import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HowItWorks from "./HowItWorks";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

const ProductDetailPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch(`http://localhost:9002/products/${productId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Fetched product data:", data); // Debugging
                const singleProduct = Array.isArray(data) ? data[0] : data;
                setProduct(singleProduct);
            })
            .catch((error) =>
                console.error("Error fetching product details:", error)
            );
    }, [productId]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <img src={product.image} className="img-fluid" alt={product.name} />
                </div>
                <div className="col-md-6">
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <p>
                        <strong>Price:</strong> Rs. {product.price.toFixed(2)}
                    </p>
                    <button
                        className="btn btn-primary"
                    >
                        Add to Cart
                    </button>
                    <div className="mt-4">
                        <HowItWorks /> {/* Include the HowItWorks component here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
