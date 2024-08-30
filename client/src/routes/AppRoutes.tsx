import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAtom } from 'jotai';
import { animationStageAtom } from '@/jotai/jotai';
// import Navbar from '@/components/Function/NavBar/index';
import Home from '@/pages/Home';
import Gallery from '@/pages/Gallery';
import Article from '@/pages/Article';
import Articles from '@/pages/Articles';
import OpeningAnimation from '@/components/OpeningAnimation';
import Butterfly from '@/components/Butterfly';

import { SiGithub, SiJuejin } from "react-icons/si";
import { BsSkipStartBtnFill } from "react-icons/bs";
import { PiArticleMediumFill } from "react-icons/pi";
import { IoImagesSharp } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";

interface AppRoutesProps {}

const AppRoutes: React.FC<AppRoutesProps> = () => {
  const [animationStage] = useAtom(animationStageAtom);

  const links = [
    {
      href: "https://github.com/ma5hr00m",
      icon: <SiGithub className="text-7" />,
    },
    {
      href: "/animation",
      icon: <FaXTwitter className="text-7" />,
    },
    {
      href: "https://juejin.cn/user/811865333304430",
      icon: <SiJuejin className="text-7" />,
    },
    {
      href: "/articles",
      icon: <PiArticleMediumFill className="text-7" />,
    },
    {
      href: "/animation",
      icon: <BsSkipStartBtnFill className="text-7" />,
    },
    {
      href: "/gallery",
      icon: <IoImagesSharp className="text-7" />,
    },
  ];

  // const navItems = [
  //   { path: '/', label: 'Home' },
  //   { path: '/articles', label: 'Articles' },
  //   { path: '/gallery', label: 'Gallery' },
  // ];

  const renderContent = () => {
    switch (animationStage) {
      case "open":
        return <OpeningAnimation />;
      case "end":
        return (
          <div id='focalhub-app'>
            {/* <Navbar items={navItems} /> */}
            <Routes>
              <Route path='/' element={<Home links={links} />} />
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
