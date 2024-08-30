import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { CircularList } from "@/types/types";

interface ButterflyProps {}

const Butterfly: React.FC<ButterflyProps> = ({}) => {
  const navigate = useNavigate();
  const items = [
    { path: '/', label: 'Home' },
    { path: '/articles', label: 'Articles' },
    { path: '/gallery', label: 'Gallery' },
  ];

  const circularListRef = useRef(new CircularList(items));

  const handleClick = () => {
    try {
      circularListRef.current.next();
      const currentItem = circularListRef.current.getCurrent();
      // console.log("Current Element: ", currentItem);
      navigate(currentItem.path);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={handleClick}>Next</button>
      <div className={styles.butterfly}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Butterfly;
