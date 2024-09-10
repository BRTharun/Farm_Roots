import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/styles/CategoryHomePage.css';

interface Category {
  name: string;
  image: string;
}

const CategoryHomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:9002/categories')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/category/${categoryName}`);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Categories</h1>
      <div className="row">
        {categories.map((category) => (
          <div key={category.name} className="col-md-4 mb-4">
            <div
              className="card"
              onClick={() => handleCategoryClick(category.name)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={`${category.image}`}
                className="card-img-top"
                alt={category.name}
                style={{ objectFit: 'contain', height: '200px' }}
              />
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryHomePage;
