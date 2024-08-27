import React from 'react';
import { Link } from 'react-router-dom';

// 定义 NavItem 类型
interface NavItem {
    path: string;
    label: string;
}

// 定义 NavbarProps 类型
interface NavbarProps {
    items: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
    return (
        <nav style={styles.navbar}>
            <ul style={styles.navList}>
                {items.map((item) => (
                    <li key={item.path} style={styles.navItem}>
                        <Link to={item.path} style={styles.navLink}>
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

// 简单的样式
const styles = {
    navbar: {
        backgroundColor: '#333',
        padding: '10px 20px',
    },
    navList: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
    },
    navItem: {
        marginRight: '20px',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
    },
};

export default Navbar;
