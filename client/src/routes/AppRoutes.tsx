import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAtom } from 'jotai';
import { animationStageAtom } from '@/jotai/jotai';
import Navbar from '@/components/Function/NavBar/index';
import OpeningAnimation from '@/components/OpeningAnimation';
import Footer from '@/components/Function/Footer';
import { SiGithub, SiJuejin } from "react-icons/si";
import { BsSkipStartBtnFill } from "react-icons/bs";
import { PiArticleMediumFill } from "react-icons/pi";
import { IoImagesSharp } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";

const Wellcome = lazy(() => import('@/pages/Welcome'));
const Home = lazy(() => import('@/pages/Home'));
const Gallery = lazy(() => import('@/pages/Gallery'));
const Article = lazy(() => import('@/pages/Article'));
const Articles = lazy(() => import('@/pages/Articles'));

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
    { path: '/gallery', label: '图床' },
    { path: '/about', label: '关于' },
  ];

  const renderContent = () => {
    switch (animationStage) {
      case "open":
        return <OpeningAnimation />;
      case "end":
        return (
          <div id='focalhub-app' className='min-h-100vh h-full flex flex-col'>
            <Navbar items={navItems} />
            <div className='relative w-full h-full'>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path='/' element={<Wellcome />} />
                  <Route path='/home' element={<Home links={links} />} />
                  <Route path='/gallery' element={<Gallery />} />
                  <Route path='/article/:slug' element={<Article />} />
                  <Route path='/articles' element={<Articles />} />
                </Routes>
              </Suspense>
            </div>
            <Footer />
          </div>
        );
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <BrowserRouter>
      {renderContent()}
    </BrowserRouter>
  );
}

export default AppRoutes;
