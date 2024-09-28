import React from "react";
import { Icon } from '@iconify/react';

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  
  return (
    <div className='flex h-36 justify-center items-center'>
      <div className='h-full px4 w-240 flex justify-between items-center'>
        <div className="h-full flex flex-col items-start justify-center text-3.5 font-400 text-gray-5 gap-y-1">
          <span className="flex items-center gap-x-1">
            <img src="./police.png" className="w-3" alt="GongAn" />
            浙ICP备2023028448号-1
          </span>
          <span className="">Copyright © Kinoko 2024. All rights reserved.</span>
        </div>
        <div className="h-full flex flex-col items-start justify-center">
          <div className="flex gap-x-3">
            <a className="text-6 duration-300 text-gray-5 hover:text-blue-500" href="https://github.com/ma6hr00m">
              <Icon className="" icon="fa-brands:github-alt" />
            </a>
            <a className="text-6 duration-300 text-gray-5 hover:text-blue-500" href="https://github.com/ma5hr00m">
              <Icon className="" icon="fa-brands:qq" />
            </a>
            <a className="text-6 duration-300 text-gray-5 hover:text-blue-500" href="https://github.com/ma5hr00m">
              <Icon className="" icon="fa-brands:twitter" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer