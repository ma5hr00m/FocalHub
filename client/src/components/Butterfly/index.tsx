import React from "react";
import styles from "./index.module.scss";

interface ButterflyProps {}

const Butterfly: React.FC<ButterflyProps> = ({}) => {
  const handleClick = () => {
    console.log(1);
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={handleClick}></button>
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
