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
    <div className='fixed z-200 flex h-15 w-full justify-center bg-[#ffffffa0] border-b-gray-3 border-b-[1px] border-b-solid backdrop-filter backdrop-blur-md'>
      <div className='h-full px8 w-260 flex justify-between'>
        <div className='flex h-full items-center gap-x-4'>
          <img src='https://img.ma5hr00m.top/main/emoticon/favicon-64.ico' className='w-7' />
          <span className='flex text-4.5 font-400 text-gray-8'>菇言菇语</span>
        </div>
        {/* PC 页面导航栏 */}
        <div className='hidden md:flex h-full items-center gap-x-7'>
          {items.map((item) => (
            <div key={item.path}>
              <Link to={item.path} className='text-3.5 font-400 text-gray-8 visited:text-gray-8 hover:text-green-5'>
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