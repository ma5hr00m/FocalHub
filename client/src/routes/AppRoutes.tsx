import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from '@/components/NavBar';

import Home from '../pages/Home';
import Gallery from '../pages/Gallery';
import Article from '../pages/Article';
import Articles from '../pages/Articles';

interface AppRoutesProps {}

const AppRoutes: React.FC<AppRoutesProps> = ({}) => {
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/articles', label: 'Articles' },
    { path: '/gallery', label: 'Gallery' },
  ];
  
  return (
    <>
      <BrowserRouter>
        <Navbar items={navItems} />
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/gallery' element={<Gallery/>}></Route>
          <Route path='/article/:slug' element={<Article />}></Route>
          <Route path='/articles' element={<Articles />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;