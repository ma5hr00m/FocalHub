import React from "react";
import { SiGithub, SiJuejin } from "react-icons/si";
import { BsSkipStartBtnFill } from "react-icons/bs";
import { PiArticleMediumFill } from "react-icons/pi";
import { IoImagesSharp } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  
  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-[#E9F4FD]">
      <div className="">
        <div className="m-2 w-90 h-fit flex flex-col rounded-md overflow-hidden gap-x-5 justify-between">
              {/*  */}
          {/* 基本信息条 */}
          <div className="p4 bg-white">
            <div className="flex gap-x-3">
              <div className="w-12 h-12 rounded-md overflow-hidden">
                <img
                  className="w-full h-full"
                  src="https://q1.qlogo.cn/g?b=qq&nk=3411281455&s=640"
                  alt=""
                />
              </div>
              <div className="h-12 flex flex-col justify-between items-start">
                <span className="text-5 font-600">阿菇kinoko</span>
                <span className="text-4">在平淡的生活中创造不平淡</span>
              </div>
            </div>
          </div>
          {/* 相关链接 */}
          <div className="grid grid-cols-2 gap-4 p4 pt0 bg-white">
            <a href="https://github.com/ma5hr00m" className="h-24 bg-gray-1 rounded-md flex flex-col justify-center items-center gap-y-2 color-gray-6 visited:color-gray-6">
              <SiGithub className="text-8 " />
              <span color=" font-600">GitHub</span>
            </a>
            <a href="/animation" className="h-24 bg-gray-1 rounded-md flex flex-col justify-center items-center gap-y-2 color-gray-6 visited:color-gray-6">
              <FaXTwitter className="text-8" />
              <span color="">Twitter</span>
            </a>
            <a href="https://juejin.cn/user/811865333304430" className="h-24 bg-gray-1 rounded-md flex flex-col justify-center items-center gap-y-2 color-gray-6 visited:color-gray-6">
              <SiJuejin className="text-8 " />
              <span color="">稀土掘金</span>
            </a> 
            <a href="/articles" className="h-24 bg-gray-1 rounded-md flex flex-col justify-center items-center gap-y-2 color-gray-6 visited:color-gray-6">
              <PiArticleMediumFill className="text-8 " />
              <span color="">博客文章</span>
            </a>
            <a href="/animation" className="h-24 bg-gray-1 rounded-md flex flex-col justify-center items-center gap-y-2 color-gray-6 visited:color-gray-6">
              <BsSkipStartBtnFill className="text-8 " />
              <span color="">CSS 动画</span>
            </a>
            <a href="/animation" className="h-24 bg-gray-1 rounded-md flex flex-col justify-center items-center gap-y-2 color-gray-6 visited:color-gray-6">
              <IoImagesSharp className="text-8 " />
              <span color="">素材展示</span>
            </a>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Home;