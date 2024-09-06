import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryBar from '../pages/user/CategoryBar';
import CategoryPage from '../pages/user/CategoryPage';

const CategoryRoute: React.FC = () => {
    return (
        <Router>
            <div>
                <CategoryBar />
                <Routes>
                    <Route path="/category/:category" element={<CategoryPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default CategoryRoute;
