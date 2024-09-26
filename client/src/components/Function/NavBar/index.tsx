import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
}

interface NavbarProps {
  items: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed z-200 flex h14 w-full justify-center duration-300 shadow-md ${isScrolled ? 'backdrop-filter backdrop-blur-md h12 bg-[#101323a0]' : ''}`}>
      <div className='h-full px-8 w-260 flex justify-between'>
        <Link to='/' className='flex h-full items-center justify-center gap-x-3 text-white'>
          <img src='https://img.ma5hr00m.top/main/emoticon/favicon-64.ico' className='w-7' />
          <span className='flex text-4.5 font-600'>菇言菇语</span>
        </Link>
        {/* PC 页面导航栏 */}
        <div className='hidden md:flex h-full items-center gap-x-7'>
          {items.map((item) => (
            <div key={item.path}>
              <Link to={item.path} className='text-3.75 font-600 duration-200 text-white visited:text-white hover:text-red-6'>
                {item.label}
              </Link>
            </div>
          ))}
        </div>
        {/* 移动设备导航栏 */}
        <div className='flex md:hidden'>
          {/* 这里可以添加移动设备的导航项 */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
