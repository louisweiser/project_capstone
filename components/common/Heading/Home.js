import SettingButton from "@/components/common/Link/Setting.js";

import styles from "./home.module.css";

export default function Header({ title }) {
  return (
    <header className={styles.header}>
      <div className={styles.position}>
        <SettingButton></SettingButton>
      </div>
      <h1>{title}</h1>
    </header>
  );
}
