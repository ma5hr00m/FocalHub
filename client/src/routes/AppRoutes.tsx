import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAtom } from 'jotai';
import { animationStageAtom } from '@/jotai/jotai';
import Navbar from '@/components/Function/NavBar/index';
import Wellcome from '@/pages/Welcome';
import Home from '@/pages/Home';
import Gallery from '@/pages/Gallery';
import Article from '@/pages/Article';
import Articles from '@/pages/Articles';
import OpeningAnimation from '@/components/OpeningAnimation';
// import Butterfly from '@/components/Butterfly';

import { SiGithub, SiJuejin } from "react-icons/si";
import { BsSkipStartBtnFill } from "react-icons/bs";
import { PiArticleMediumFill } from "react-icons/pi";
import { IoImagesSharp } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import Footer from '@/components/Function/Footer';

interface AppRoutesProps {}

const AppRoutes: React.FC<AppRoutesProps> = () => {
  const [animationStage] = useAtom(animationStageAtom);

  const links = [
    {
      href: "https://github.com/ma5hr00m",
      icon: <SiGithub className="text-7" />,
    },
    {
      href: "https://x.com/ma5hr00m",
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

  const navItems = [
    { path: '/', label: '主页' },
    { path: '/articles', label: '文章' },
    { path: '/gallery', label: '画廊' },
    { path: '/about', label: '关于' },
  ];

  const renderContent = () => {
    switch (animationStage) {
      case "open":
        return <OpeningAnimation />;
      case "end":
        return (
          <div id='focalhub-app' className='min-h-100vh h-full flex flex-col bg-gray-1'>
            <Navbar items={navItems} />
            <div className='flex-1'>
              <Routes>
                {/* 打算重做首页，原 Home 标签页转移到 /home 下 */}
                <Route path='/' element={<Wellcome />} />
                <Route path='/home' element={<Home links={links} />} />
                <Route path='/gallery' element={<Gallery />} />
                <Route path='/article/:slug' element={<Article />} />
                <Route path='/articles' element={<Articles />} />
              </Routes>
            </div>
            <Footer></Footer>
          </div>
        );
      default:
        return <div>Loading...</div>; // 默认状态
    }
  };

  return (
    <BrowserRouter>
      {/* lowpoly动态切页按钮延后开发，先做基础的 NavBar */}
      {/* <Butterfly></Butterfly> */}
      {renderContent()}
    </BrowserRouter>
  );
}

export default AppRoutes;
