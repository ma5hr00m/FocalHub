import React from 'react';
import { Link } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
}

interface NavbarProps {
  items: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  return (
    <nav>
      <div>
        {items.map((item) => (
          <div key={item.path}>
            <Link to={item.path}>
              {item.label}
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;