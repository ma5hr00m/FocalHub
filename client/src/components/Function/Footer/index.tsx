import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  
  return (
    <div className='flex h-16 justify-center items-center'>
      <div className='h-full px8 w-320 min-w-200 flex justify-center items-center'>
        <div className="">
          <span className="text-4 font-400 text-gray-8">Copyright © Kinoko 2024</span>
        </div>
      </div>
    </div>
  )
}

export default Footer