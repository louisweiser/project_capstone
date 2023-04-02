import styles from "./home.module.css";

export default function Header({ title }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.font}>{title}</h1>
    </header>
  );
}
