import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  
  return (
    <div className='flex h-10 justify-center items-center'>
      <div className='h-full px8 w-320 min-w-200 flex justify-center'>
        <div>
          <span className="font-400 text-gray-6">Copyright © kinoko 2024</span>
        </div>
      </div>
    </div>
  )
}

export default Footer