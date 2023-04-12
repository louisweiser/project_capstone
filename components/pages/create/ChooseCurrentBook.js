import React, { useEffect, useState, useContext, useRef } from "react";
import { useRouter } from "next/router";
import styled, { keyframes, css } from "styled-components";

import { MyContext } from "@/contexts/myContext.js";

import CoverFromData from "@/components/common/Cover/BookCover.js";

import { BackSVG } from "@/public/svgs/router";
import { DataContext } from "@/contexts/dataContext.js";

import searchBooks from "@/components/common/Search";

const slideUp = keyframes`
  0% {
    top: 0;
  }
  100% {
    top: -100%;
  }
`;

const slideDown = keyframes`
  0% {
    top: -100%;
  }
  100% {
    top: 0;
  }
`;

const StyledSearchFieldContainer = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: ${({ chooseCurrentBook }) => (chooseCurrentBook ? "0" : "-100%")};
  z-index: 10;
  width: 100vw;
  height: 52px;
  margin-bottom: 10px;
  padding-left: 5px;
  gap: 10px;
  border: none;
  background-color: #03314b;
  border-bottom: 1px solid #fffefb;
`;

const StyledInputField = styled.input`
  width: calc(100vw - 40px);
  height: 37px;
  margin: 5px;
  border: none;
  background: none;
  outline: none;
`;

const StyledResultContainer = styled.div`
  position: fixed;
  top: ${({ initialHide, chooseCurrentBook }) =>
    initialHide ? "-100%" : chooseCurrentBook ? "0" : "-100%"};
  left: 0;
  z-index: 1;
  width: 100vw;
  height: 100%;
  padding-top: 52px;
  background-color: #03314b;
  overflow-x: hidden;
  box-sizing: border-box;
  animation: ${({ chooseCurrentBook, initialHide }) =>
    initialHide
      ? "none"
      : chooseCurrentBook
      ? css`
          ${slideDown} 0.6s ease-in-out forwards
        `
      : css`
          ${slideUp} 0.3s ease-in-out forwards
        `};
`;

const StyledResultList = styled.ul`
  display: column;
  overflow-y: scroll;
  height: calc(100vh - 52px);
  width: 100vw;
`;

const StyledResultListItem = styled.li`
  display: flex;
  flex-direction: row;
  margin: 10px;
  width: calc(100vw-20px);
`;

const StyledBookInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-start;
  white-space: nowrap;
  overflow: hidden;
  margin-left: 8px;
`;

const StyledResultButton = styled.button`
  width: 100vw;
`;

export default function CurrentBook() {
  const [searchTerm, setSearchTerm] = useState("");
  const [initialHide, setInitialHide] = useState(true);
  const { setCurrentbook } = useContext(MyContext);
  const { chooseCurrentBook, setChooseCurrentBook } = useContext(MyContext);
  const { bookData } = useContext(DataContext);

  const inputRef = useRef(null);

  const router = useRouter();

  const searchResults = searchBooks(searchTerm, bookData);

  useEffect(() => {
    if (chooseCurrentBook) {
      inputRef.current.focus();
      setInitialHide(false);
    }
  }, [chooseCurrentBook]);

  useEffect(() => {
    if (!chooseCurrentBook) {
      return;
    }
    const handleRouteChange = () => {
      setChooseCurrentBook(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  });

  const handleBackClick = () => {
    setChooseCurrentBook(false);
    setSearchTerm("");
  };

  const handleOnClick = () => {
    setInitialHide(false);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <StyledSearchFieldContainer
        initialHide={initialHide}
        chooseCurrentBook={chooseCurrentBook}
      >
        {chooseCurrentBook && !initialHide && (
          <button onClick={handleBackClick}>
            <BackSVG></BackSVG>
          </button>
        )}{" "}
        <StyledInputField
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onClick={handleOnClick}
          placeholder="  search ..."
        />
      </StyledSearchFieldContainer>
      <StyledResultContainer
        initialHide={initialHide}
        chooseCurrentBook={chooseCurrentBook}
      >
        {searchTerm !== "" && (
          <StyledResultList>
            {searchResults.length !== 0 ? (
              searchResults.map((item) => (
                <StyledResultButton
                  key={item.slug}
                  type="button"
                  onClick={() => {
                    setCurrentbook(item.slug);
                    setChooseCurrentBook(false);
                    setSearchTerm("");
                  }}
                >
                  <StyledResultListItem>
                    <CoverFromData
                      slug={item.slug}
                      height={100}
                    ></CoverFromData>
                    <StyledBookInfoContainer>
                      <h4>
                        {item.title} {item.subtitle}
                      </h4>
                      <h5>von {item.author}</h5>
                    </StyledBookInfoContainer>
                  </StyledResultListItem>
                </StyledResultButton>
              ))
            ) : (
              <h1>no result like {searchTerm}</h1>
            )}
          </StyledResultList>
        )}
      </StyledResultContainer>
    </>
  );
}
