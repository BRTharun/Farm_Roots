// CategoryBar.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/CategoryBar.css';
import { API_BASE_URL } from '../../services/api';

interface Category {
    categoryId: number;
    categoryName: string;
    imageUrl: string | null;
}

const CategoryBar: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/Category/`)
            .then(response => response.json())
            .then(data => {
                if (data.isSuccess) {
                    setCategories(data.result);
                }
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    return (
        <div className="category-bar">
            {categories.map(category => (
                <Link key={category.categoryId} to={`/category/${category.categoryName.toLowerCase()}`} className="single-category">
                    <h4>{category.categoryName}</h4>
                </Link>
            ))}
        </div>
    );
};

export default CategoryBar;
