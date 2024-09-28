import React, { useEffect, useState, useCallback } from 'react';
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

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    if (scrollY > 0 && !isScrolled) {
      setIsScrolled(true);
    } else if (scrollY === 0 && isScrolled) {
      setIsScrolled(false);
    }
  }, [isScrolled]);

  useEffect(() => {
    const onScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  return (
    <div className={`fixed z-100 flex w-full justify-center duration-200 shadow-md ${isScrolled ? 'h-13 bg-[#30304ad0] backdrop-filter backdrop-blur-xl' : 'h-18 bg-transparent'}`}>
      <div className='flex h-full w-240 justify-between px4'>
        <Link to='/' className='flex h-full items-center justify-center gap-x-3 text-gray-1'>
          <img src='./logo.svg' className='w6' alt='Logo' />
          <p className='flex text-4.5 font-200 tracking-wide text-gray-1'>菇言菇语</p>
        </Link>
        <div className='hidden md:flex h-full items-center gap-x-7'>
          {items.map((item) => (
            <Link key={item.path} to={item.path} className='text-3.75 font-200 duration-200 text-gray-1 visited:text-gray-1 hover:text-blue-500'>
              {item.label}
            </Link>
          ))}
        </div>
        <div className='flex md:hidden'></div>
      </div>
    </div>
  );
};

export default Navbar;
