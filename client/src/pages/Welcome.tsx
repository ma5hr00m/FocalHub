import React from "react";

interface WellcomeProps {}

const Wellcome: React.FC<WellcomeProps> = ({}) => {
  
  return (
    <div className='h-full w-full flex items-center justify-center'>
      <div className='w-200 min-w-60 px6 flex flex-col gap-y-4 pt6'>
      </div>
    </div>
  )
}

export default Wellcome