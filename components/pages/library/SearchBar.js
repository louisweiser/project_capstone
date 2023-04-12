import React, { useState, useContext } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";

import CoverFromData from "@/components/common/Cover/BookCover.js";
import searchBook from "@/components/common/Search";

import { DataContext } from "@/contexts/dataContext.js";

import { BackSVG } from "@/public/svgs/router";

const SlideUp = keyframes`
  0% {
    top: 52px;
  }
  100% {
    top: -100%;
  }
`;

const SlideDown = keyframes`
  0% {
    top: -100%;
  }
  100% {
    top: 52px;
  }
`;

const StyledSearchbarContainer = styled.div`
  /*layout*/
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 5;
  /*dimension*/
  height: 62px;
  width: 100vw;
  /*style*/
  background-color: #032330;
`;

const StyledSearchInputFieldContainer = styled.div`
  /*layout*/
  display: flex;
  justify-content: center;
  align-items: center;
  /*dimension*/
  height: ${({ searchIsActive }) => (searchIsActive ? "52px" : "47px")};
  width: ${({ searchIsActive }) =>
    searchIsActive ? "100vw" : "calc(100vw - 15px)"};
  gap: 10px;
  /*style*/
  background-color: #03314b;
  border-radius: ${({ searchIsActive }) => (searchIsActive ? "0" : "5px")};
`;

const StyledSearchInputField = styled.input`
  /*layout*/
  width: calc(100vw - 45px);
  height: 37px;
  /*style*/
  border: none;
  background: none;
  outline: none;
`;

const StyledResultFieldContainer = styled.div`
  /*layout*/
  position: fixed;
  top: -100%;
  left: 0;
  /*dimension*/
  width: 100%;
  height: calc(100vh - 37px);
  /*style*/
  background-color: #03314b;
  animation: ${({ initialHide, searchIsActive }) =>
      initialHide ? "none" : searchIsActive ? SlideDown : SlideUp}
    ${({ initialHide }) => (initialHide ? "0s" : "0.5s")} ease-in-out forwards;
  z-index: 1;
`;

const StyledList = styled.ul`
  /*layout*/
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  /*dimension*/
  height: calc(100vh - 57px);
`;

const StyledListItem = styled.li`
  /*layout*/
  display: flex;
  flex-direction: row;
  /*dimension*/
  margin: 20px 10px 0 10px;
`;

const StyledBookInfoContainer = styled.div`
  /*layout*/
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  overflow: hidden;
  flex-grow: 1; // Erlaubt dem StyledBookInfoContainer, verfügbaren Platz zu nutzen
  /*dimension*/
  margin-left: 8px;
`;

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [initialHide, setInitialHide] = useState(true);
  const [searchIsActive, setSearchIsActive] = useState(false);
  const { bookData } = useContext(DataContext);

  const searchResults = searchBook(searchTerm, bookData);

  const handleBackClick = () => {
    setSearchIsActive(false);
    setSearchTerm("");
  };

  const handleOnClick = () => {
    setSearchIsActive(true);
    setInitialHide(false);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <StyledSearchbarContainer>
        <StyledSearchInputFieldContainer searchIsActive={searchIsActive}>
          {searchIsActive && (
            <button onClick={handleBackClick}>
              <BackSVG></BackSVG>
            </button>
          )}
          <StyledSearchInputField
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onClick={handleOnClick}
            placeholder="  search ..."
          />
        </StyledSearchInputFieldContainer>
      </StyledSearchbarContainer>
      <StyledResultFieldContainer
        initialHide={initialHide}
        searchIsActive={searchIsActive}
      >
        {searchTerm !== "" && (
          <StyledList>
            {searchResults.length !== 0 ? (
              searchResults.map((item) => (
                <Link href={`/library/book/${item.slug}`} key={item.slug}>
                  <StyledListItem>
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
                  </StyledListItem>
                </Link>
              ))
            ) : (
              <h1>no result like {searchTerm}</h1>
            )}
          </StyledList>
        )}
      </StyledResultFieldContainer>
    </>
  );
}
