import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from '@/components/NavBar';

import Home from '../pages/Home';
import Gallery from '../pages/Gallery';
import Blog from '../pages/Blog';
import Blogs from '../pages/Blogs';

interface AppRoutesProps {}

const AppRoutes: React.FC<AppRoutesProps> = ({}) => {
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/blogs', label: 'Blogs' },
    { path: '/gallery', label: 'Gallery' },
  ];
  
  return (
    <>
      <BrowserRouter>
        <Navbar items={navItems} />
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/gallery' element={<Gallery/>}></Route>
          <Route path='/blog/:slug' element={<Blog />}></Route>
          <Route path='/blogs' element={<Blogs />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;