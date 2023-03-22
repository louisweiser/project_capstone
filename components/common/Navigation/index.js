import Link from "next/link";
import { useRouter } from "next/router";

import {
  HomeSVG,
  LibrarySVG,
  ReadingSVG,
  CreateSVG,
  CreateSVGActive,
  LibrarySVGActive,
  ReadingSVGActive,
  HomeSVGActive,
} from "@/public/svgs/navigationbar.js";

import styles from "./navigation.module.css";

const Navigation = () => {
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        <Link href="/home">
          <li className={styles.navbarListItem}>
            {router.pathname === "/home" ? <HomeSVGActive /> : <HomeSVG />}
            <h5 className={styles.text}>Home</h5>
          </li>
        </Link>
        <Link href="">
          <li className={styles.navbarListItem}>
            {router.pathname === "/library" ? (
              <LibrarySVGActive />
            ) : (
              <LibrarySVG />
            )}
            <h5 className={styles.text}>Library</h5>
          </li>
        </Link>
        <Link href="">
          <li className={styles.navbarListItem}>
            {router.pathname === "/reading" ? (
              <ReadingSVGActive />
            ) : (
              <ReadingSVG />
            )}
            <h5 className={styles.text}>Read</h5>
          </li>
        </Link>
        <Link href="">
          <li className={styles.navbarListItem}>
            {router.pathname === "/create" ? (
              <CreateSVGActive />
            ) : (
              <CreateSVG />
            )}
            <h5 className={styles.text}>Create</h5>
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navigation;
