import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '@pages/Home';
import Gallery from '@pages/Gallery';

interface AppRoutesProps {}

const AppRoutes: React.FC<AppRoutesProps> = ({}) => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/gallery' element={<Gallery/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;