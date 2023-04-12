import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import styled from "styled-components";

import CoverFromData from "@/components/common/Cover/BookCover.js";

import { genreData } from "@/public/data/genre.js";
import { DataContext } from "@/contexts/dataContext.js";

const StyledHeadlineContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px 0px 15px;
  font-size: 18px;
`;

const StyledHeadline = styled.h3`
  display: inline-block;
`;

const StyledList = styled.ul`
  display: flex;
  list-style: none;
  overflow-x: scroll;
  white-space: nowrap;
  padding: 7px 0;
  margin-left: 10px;
`;

const StyledListItem = styled.li`
  margin-right: 10px;
`;

export default function BookLibrary() {
  const { bookData } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(true);

  const filterBooksByGenre = (array, key, target) => {
    return array.filter((item) => item[key] === target);
  };

  useEffect(() => {
    if (bookData && bookData.length > 0) {
      setIsLoading(false);
    }
  }, [bookData]);

  function renderBooksByGenre(filteredBookArray) {
    let renderedContent = [];
    for (let i = 0; i < filteredBookArray.length; i++) {
      renderedContent.push(
        <StyledListItem key={i}>
          <Link href={`/library/book/${filteredBookArray[i].slug}`}>
            <CoverFromData
              slug={filteredBookArray[i].slug}
              height={220}
            ></CoverFromData>
          </Link>
        </StyledListItem>
      );
    }

    return renderedContent;
  }

  function renderLibary() {
    let renderedLibary = [];

    genreData.map((item, index) => {
      const filteredBookArray = filterBooksByGenre(bookData, "genre", item);
      if (filteredBookArray.length < 1) {
        return;
      }
      renderedLibary.push(
        <div key={index}>
          <Link href={`/library/genre/${item}`}>
            <StyledHeadlineContainer>
              <StyledHeadline>{item}</StyledHeadline>
            </StyledHeadlineContainer>
          </Link>
          <StyledList>{renderBooksByGenre(filteredBookArray)}</StyledList>
        </div>
      );
    });
    return renderedLibary;
  }

  return !isLoading && renderLibary();
}
