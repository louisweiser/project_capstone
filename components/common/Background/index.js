import { useState, useEffect } from "react";

import BackgroundSVG from "@/public/svgs/background.js";

import styles from "./background.module.css";

export default function Background() {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    setScreenWidth(window.innerWidth);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.body}>
      <BackgroundSVG width={screenWidth} />
    </div>
  );
}
