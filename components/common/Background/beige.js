import { useState, useEffect } from "react";

import { BackgroundSVG } from "@/public/svgs/background.js";

import styles from "./background.module.css";

//hier wird der Bildschirmhintergrund dynamisch der Bildschirmbreite ermittelt und erzeugt
export default function Background() {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(Math.floor(window.innerWidth));
    }

    window.addEventListener("resize", handleResize); //bei Änderungen der Bildschirmgröße soll die Breit neu ermittelt werden

    setScreenWidth(window.innerWidth); // Initialisiere die aktuelle Bildschirmgröße

    return () => {
      window.removeEventListener("resize", handleResize);
    }; // Entferne den Event-Listener, wenn die Komponente unmountet wird
  }, []);

  return (
    <div className={styles.body}>
      <BackgroundSVG width={screenWidth} />
    </div>
  );
}
