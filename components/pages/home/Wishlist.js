import { wishListData } from "@/public/data/wishlist.js";

import styles from "./wishlist.module.css";

export default function DynamicList() {
  const items = wishListData;
  return (
    <ul className={styles.list}>
      {items.map((item, index) => (
        <li key={index} className={styles.listitem}>
          {item}
        </li>
      ))}
    </ul>
  );
}
