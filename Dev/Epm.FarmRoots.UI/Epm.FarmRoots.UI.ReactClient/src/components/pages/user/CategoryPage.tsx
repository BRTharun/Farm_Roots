// CategoryPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/CategoryPage.css';
import { PRODUCT_API_URL } from '../../services/api'

interface Product {
    productId: number;
    productName: string;
    productDescription: string;
    productCategory: string;
    productStock: number;
    productMrp: number;
    productSalePrice: number;
    productImage: string;
}

const CategoryPage: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            if (category) {
                setLoading(true);
                try {
                    const response = await fetch(`${PRODUCT_API_URL}/Product?category=${category}`);
                    const data = await response.json();
                    setProducts(data);
                } catch (error) {
                    console.error('Error fetching products:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProducts();
    }, [category]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="category-page">
            <h2>{category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 'Category'} Products</h2>

            <div className="products-list">
                {products.map(product => (
                    <div key={product.productId} className="product-card">
                        <img src={product.productImage} alt={product.productName} />
                        <h3>{product.productName}</h3>
                        <p>{product.productDescription}</p>
                        <p>Price: {product.productMrp}</p>
                        <p>Sale Price: {product.productSalePrice}</p>
                        <p>Stock: {product.productStock}</p>
                        <button>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;
