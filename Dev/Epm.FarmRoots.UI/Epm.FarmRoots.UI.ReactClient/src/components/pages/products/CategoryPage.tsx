import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./SideBar";
import "../../../assets/styles/CategoryPage.css";

interface Subcategory {
  id: string;
  name: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:9002/categories?name=${categoryName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const category = data[0];
        setSubcategories(category.subcategories);

        if (category.subcategories.length > 0) {
          const firstSubcategory = category.subcategories[0].name;
          setSelectedSubcategory(firstSubcategory);
          fetchProducts(firstSubcategory);
        }
      })
      .catch((error) => console.error("Error fetching subcategories:", error));
  }, [categoryName]);

  const fetchProducts = (subcategoryName: string) => {
    fetch(
      `http://localhost:9002/products?category=${categoryName}&subcategory=${subcategoryName}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handleSubcategoryClick = (subcategoryName: string) => {
    setSelectedSubcategory(subcategoryName);
    fetchProducts(subcategoryName);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <Sidebar
            subcategories={subcategories}
            onSelectSubCategory={handleSubcategoryClick}
            activeSubcategory={selectedSubcategory || ""}
          />
        </div>
        <div className="col-md-9">
          <h1>{categoryName}</h1>
          <div className="row">
            {products.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card product-card">
                  <Link
                    to={`/product/${product.id}`}
                    className="text-decoration-none text-dark"
                  >
                    <img
                      src={product.image}
                      className="card-img-top product-image"
                      alt={product.name}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">
                        Rs. {product.price.toFixed(2)}
                      </p>
                      <button
                        className="btn btn-primary mt-auto"
                        onClick={(e) => {
                          e.preventDefault(); // Prevents Link navigation on button click
                        }}
                      >
                        Add to Cart
                        {/* <AddToCartButton/> */}
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
