import { useState, useEffect, useContext } from "react";
import Link from "next/link";

import CoverFromData from "@/components/common/Cover/coverData.js";

import { genreData } from "@/public/data/genre.js";

import { DataContext } from "@/contexts/dataContext.js";

import styles from "./collection.module.css";

export default function CollectionFromData() {
  const { bookData } = useContext(DataContext); //Metadaten
  const [isLoading, setIsLoading] = useState(true); //Fehlerbehandlung

  const FilterData = (array, key, value) => {
    return array.filter((item) => item[key] === value);
  };

  useEffect(() => {
    if (bookData && bookData.length > 0) {
      setIsLoading(false);
    }
  }, [bookData]);

  function render(filter) {
    const filteredArray = FilterData(bookData, "genre", filter);
    let content = [];
    for (let i = 0; i < filteredArray.length; i++) {
      content.push(
        <li key={i} className={styles.bookitem}>
          <Link href={`/library/book/${filteredArray[i].slug}`}>
            <CoverFromData
              slug={filteredArray[i].slug}
              height={220}
            ></CoverFromData>
          </Link>
        </li>
      );
    }

    return content;
  }

  return genreData.map((item, index) => (
    <div key={index}>
      <Link href={`/library/genre/${item}`}>
        <div className={styles.category}>
          <h3 className={styles.categorytext}> {item}</h3>
        </div>
      </Link>
      <ul className={styles.collection}>
        {isLoading ? <div></div> : render(item)}
      </ul>
    </div>
  ));
}
