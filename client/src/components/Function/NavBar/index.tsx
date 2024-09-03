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
    <div className='flex bg-white h-15 shadow-[0_0_8px_0_#d0d0d0ff] justify-center'>
      <div className='h-full px8 w-280 w-min-200 flex justify-between'>
        <div className='flex h-full items-center gap-x-4'>
          <div className='h-8'>
            <img className='w-full h-full' src='/logo.svg'></img>
          </div>
          <span className='flex text-5 font-700'>FocalHub</span>
        </div>
        {/* PC 页面导航栏 */}
        <div className='hidden md:flex h-full items-center gap-x-7'>
          {items.map((item) => (
            <div key={item.path}>
              <Link to={item.path} className='text-4 font-600 text-gray-8 visited:text-gray-8 hover:text-green-5'>
                {item.label}
              </Link>
            </div>
          ))}
        </div>
        {/* 移动设备导航栏 */}
        <div className='flex md:hidden'>

        </div>
      </div>
    </div>
  );
};

export default Navbar;