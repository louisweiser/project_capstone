import { useContext, useState, useEffect } from "react";
import styled from "styled-components";

import shuffleArray from "@/utils/shuffleArray.js";

import { DataContext } from "@/contexts/dataContext.js";
import { MyContext } from "@/contexts/myContext.js";

const StyledContentContainer = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow-y: scroll;
  width: auto;
  max-height: 30vh;
  margin: 10px 5px 0px 5px;
  padding: 25px;
  background-color: #03314b;
  border-top: #032330 solid 2px;
  border-bottom: #032330 solid 2px;
`;

export default function BookContent() {
  const { contentData } = useContext(DataContext);
  const { searchTerm } = useContext(MyContext);
  const [contentArray, setContentArray] = useState([]);

  useEffect(() => {
    setContentArray(
      shuffleArray(mergeArrays(renderAllQuotes(), renderAllStories()))
    );
  }, []);

  const getAllStories = contentData.reduce((accumulator, current) => {
    return accumulator.concat(current.stories);
  }, []);

  const getAllQuotes = contentData.reduce((accumulator, current) => {
    return accumulator.concat(current.quotes);
  }, []);

  const allStoriesArray = getAllStories;
  const allQuotesArray = getAllQuotes;

  function renderAllStories() {
    let array = [];

    if (searchTerm !== "") {
      array = filterBySearchTerm(allStoriesArray, searchTerm);
    } else {
      array = allStoriesArray;
    }

    const allRenderedStories = [];
    array.forEach((storyItem, index) => {
      allRenderedStories.push(
        <StyledContentContainer key={`${index}`}>
          <h3>{storyItem.title && storyItem.title}</h3>
          <p>{storyItem.text && storyItem.text}</p>
          {storyItem.page && <p>{storyItem.page}</p>}
        </StyledContentContainer>
      );
    });
    return allRenderedStories;
  }
  function renderAllQuotes() {
    let array = [];

    if (searchTerm !== "") {
      array = filterBySearchTerm(allQuotesArray, searchTerm);
    } else {
      array = allQuotesArray;
    }

    const allRenderedQuotes = [];
    array.forEach((storyItem, index) => {
      allRenderedQuotes.push(
        <StyledContentContainer key={`${index + 0.5}`}>
          {storyItem.text && <p>{storyItem.text}</p>}
          {storyItem.page && <p>{storyItem.page}</p>}
        </StyledContentContainer>
      );
    });
    return allRenderedQuotes;
  }

  const mergeArrays = (...arrays) => {
    return arrays.flat();
  };

  function filterBySearchTerm(arr, searchTerm) {
    return arr.filter((obj) => {
      const searchText = searchTerm.toLowerCase();
      const textMatch = obj.text && obj.text.toLowerCase().includes(searchText);
      const titleMatch =
        obj.title && obj.title.toLowerCase().includes(searchText);

      return textMatch || titleMatch;
    });
  }

  const searchContent = mergeArrays(renderAllQuotes(), renderAllStories());

  return (
    <>
      {searchTerm === ""
        ? allStoriesArray !== undefined &&
          allQuotesArray !== undefined &&
          contentArray
        : searchContent}
    </>
  );
}
