import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/products/CategoryHomePage';
import CategoryPage from '../pages/products/CategoryPage';
import ProductDetailPage from '../pages/products/ProductDetailPage';
import '../../assets/styles/ProductRoutes.css';

function ProductRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/category/:categoryName" element={<CategoryPage />} />
      <Route path="/product/:productId" element={<ProductDetailPage />} /> 
    </Routes>
  );
}

export default ProductRoutes;
