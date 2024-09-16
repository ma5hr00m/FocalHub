import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { animationStageAtom } from '@/jotai/jotai';
import "./index.scss";

interface OpeningAnimationProps {}

const OpeningAnimation: React.FC<OpeningAnimationProps> = () => {
  const [, setAnimationStage] = useAtom(animationStageAtom);
  const [animationCount, setAnimationCount] = useState(0);
  const [animationEndedCount, setAnimationEndedCount] = useState(0);

  const handleAnimationStart = () => {
    setAnimationCount(prev => prev + 1);
  };

  const handleAnimationEnd = () => {
    setAnimationEndedCount(prev => prev + 1);
  };

  useEffect(() => {
    if (animationCount > 0 && animationCount === animationEndedCount) {
      setAnimationStage("end");
    }
  }, [animationCount, animationEndedCount, setAnimationStage]);

  return (
    <div 
      className="opening-animation" 
      onAnimationEnd={handleAnimationEnd} 
      onAnimationStart={handleAnimationStart}
    >
      <div className="animated-element" style={{ animation: 'slideIn .01s' }}>
        Another Animated Element
      </div>
    </div>
  );
}

export default OpeningAnimation;
