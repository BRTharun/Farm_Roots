import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/styles/SideBar.css';

interface Subcategory {
  id: string;
  name: string;
  image: string;
}

interface SidebarProps {
  subcategories: Subcategory[];
  onSelectSubCategory: (subcategoryName: string) => void;
  activeSubcategory: string;
}

const Sidebar: React.FC<SidebarProps> = ({ subcategories, onSelectSubCategory, activeSubcategory }) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(activeSubcategory);

  useEffect(() => {
    setSelectedSubcategory(activeSubcategory);
  }, [activeSubcategory]);

  const handleClick = (subcategoryName: string) => {
    setSelectedSubcategory(subcategoryName);
    onSelectSubCategory(subcategoryName);
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Subcategories</h2>
      <ul className="list-group">
        {subcategories.map(subcategory => (
          <li
            key={subcategory.id}
            className={`list-group-item d-flex align-items-center ${selectedSubcategory === subcategory.name ? 'active' : ''}`}
            onClick={() => handleClick(subcategory.name)}
          >
            <img
              src={subcategory.image}
              alt={subcategory.name}
              className="img-thumbnail me-2"
              style={{ width: '50px', height: '50px', objectFit: 'contain' }}
            />
            <span>{subcategory.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
