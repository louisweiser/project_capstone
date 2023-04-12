import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

import CoverFromData from "@/components/common/Cover/BookCover.js";

import { DataContext } from "@/contexts/dataContext.js";
import { MyContext } from "@/contexts/myContext.js";

const StyledList = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 7.5px;
  width: 100vw;
  gap: 5px;
`;

export default function GenreCoverLibrary() {
  const router = useRouter();
  const { slug } = router.query;

  const { bookData } = useContext(DataContext);
  const { screenWidth } = useContext(MyContext);

  const allBooksByGenre = bookData.filter((book) => book.genre === slug);

  function calculateHeights(booksArray) {
    if (!booksArray) {
      return;
    }

    const relativeFactorsArray = booksArray.map((book) => book.relativefactor);

    const heightArray = [];

    for (let i = 0; i < relativeFactorsArray.length; i += 2) {
      if (i + 1 < relativeFactorsArray.length) {
        let height = Math.floor(
          (screenWidth - 20) /
            (relativeFactorsArray[i] + relativeFactorsArray[i + 1])
        );
        if (height < 0) {
          height = 0;
        }
        heightArray.push(height);
        heightArray.push(height);
      } else {
        let height = Math.floor(
          (screenWidth - 20) / 2 / relativeFactorsArray[i]
        );
        if (height < 0) {
          height = 0;
        }
        heightArray.push(height);
      }
    }
    return heightArray;
  }

  function renderCover() {
    const heightArray = calculateHeights(allBooksByGenre);
    const renderedCover = Object.values(allBooksByGenre).map((book, index) => {
      return (
        <div key={index}>
          <Link href={`/library/book/${book.slug}`}>
            <CoverFromData
              slug={book.slug}
              height={heightArray[index]}
            ></CoverFromData>
          </Link>
        </div>
      );
    });
    return renderedCover;
  }

  return <StyledList>{renderCover()}</StyledList>;
}
