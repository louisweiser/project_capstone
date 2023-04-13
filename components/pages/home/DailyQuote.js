import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { DataContext } from "@/contexts/dataContext.js";

const StyledContainer = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: auto;
  margin-top: 175px;
  padding: 50px 20px;
  background-color: #03314b;
  border-top: #032330 solid 2px;
  border-bottom: #032330 solid 2px;
  font-size: 17px;
`;

export default function DailyQuote() {
  const { contentData } = useContext(DataContext);

  const allQuotesArray = contentData;

  const [randomItem, setRandomItem] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);

  const getRandomItem = () => {
    const index = Math.floor(Math.random() * allQuotesArray.length);
    return allQuotesArray[index];
  };

  const isValidJSON = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (!contentData || contentData.length === 0) {
      return;
    }

    const today = new Date().getDate();
    setCurrentDay(today);

    const savedDay = localStorage.getItem("savedDay");
    const savedItem = localStorage.getItem("randomItem");

    if (
      savedDay &&
      savedItem &&
      isValidJSON(savedItem) &&
      parseInt(savedDay, 10) === today
    ) {
      setRandomItem(JSON.parse(savedItem));
    } else {
      const newItem = getRandomItem();
      setRandomItem(newItem);
      localStorage.setItem("randomItem", JSON.stringify(newItem));
      localStorage.setItem("savedDay", today);
    }
  }, [contentData]);

  return (
    <StyledContainer>
      <h4>{randomItem?.text}</h4>
    </StyledContainer>
  );
}
