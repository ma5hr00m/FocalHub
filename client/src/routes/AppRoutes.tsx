import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAtom } from 'jotai';
import { animationStageAtom } from '@/jotai/jotai';
import Navbar from '@/components/NavBar';
import Home from '@/pages/Home';
import Gallery from '@/pages/Gallery';
import Article from '@/pages/Article';
import Articles from '@/pages/Articles';
import OpeningAnimation from '@/components/OpeningAnimation';
import Butterfly from '@/components/Butterfly';

interface AppRoutesProps {}

const AppRoutes: React.FC<AppRoutesProps> = () => {
  const [animationStage] = useAtom(animationStageAtom);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/articles', label: 'Articles' },
    { path: '/gallery', label: 'Gallery' },
  ];

  const renderContent = () => {
    switch (animationStage) {
      case "open":
        return <OpeningAnimation />;
      case "end":
        return (
          <div id='focalhub-app'>
            <Navbar items={navItems} />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/gallery' element={<Gallery />} />
              <Route path='/article/:slug' element={<Article />} />
              <Route path='/articles' element={<Articles />} />
            </Routes>
          </div>
        );
      default:
        return <div>Loading...</div>; // 默认状态
    }
  };

  return (
    <BrowserRouter>
      <Butterfly></Butterfly>
      {renderContent()}
    </BrowserRouter>
  );
}

export default AppRoutes;
