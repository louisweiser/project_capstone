import BackButton from "@/components/common/Button/Back.js";

import styles from "./homenavigation.module.css";

export default function Header({ title }) {
  return (
    <header className={styles.header}>
      <div className={styles.position}>
        <BackButton></BackButton>
      </div>
      <h1 className={styles.header}>{title}</h1>
    </header>
  );
}
