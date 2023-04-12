import { useContext } from "react";
import Link from "next/link";
import styled from "styled-components";

import { MyContext } from "@/contexts/myContext.js";

import {
  QuoteSVG,
  StorySVG,
  SummarySVG,
  AddBookSVG,
  CurrentBookSVG,
  ArrowRightSVG,
  ResetSVG,
} from "@/public/svgs/filter.js";

const StyledList = styled.ul`
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;
  margin-left: 1px;
  padding-top: 4px;
  padding-bottom: 9px;
  list-style: none;
  background-color: #03314b;
`;

const StyledListItem = styled.li``;

const StyledButton = styled.button`
  display: flex;
  border: 1px solid #fffefb;
  gap: 5px;
  padding: 5px 10px;
  margin: 5px;
  font-size: 13px;
  border-radius: 20px;
  background-color: ${(props) => (props.active ? "#075887" : "#032330")};
`;

export default function FilterComponent() {
  const { setChooseCurrentBook } = useContext(MyContext);
  const { theme, setTheme } = useContext(MyContext);
  const { setInput1 } = useContext(MyContext);
  const { setInput2 } = useContext(MyContext);
  const { setInput3 } = useContext(MyContext);

  const handleOnClick = () => {
    setChooseCurrentBook(true);
  };

  const handleOnClear = () => {
    setInput1("");
    setInput2("");
    setInput3("");
  };

  return (
    <StyledList>
      <StyledListItem>
        <StyledButton
          active={theme === "quotes"}
          onClick={() => {
            setTheme("quotes");
          }}
        >
          <QuoteSVG />
          Quote
        </StyledButton>
      </StyledListItem>
      <StyledListItem>
        <StyledButton
          active={theme === "stories"}
          onClick={() => {
            setTheme("stories");
          }}
        >
          <StorySVG />
          Story
        </StyledButton>
      </StyledListItem>
      <StyledListItem>
        <StyledButton
          active={theme === "summary"}
          onClick={() => {
            setTheme("summary");
          }}
        >
          <SummarySVG />
          Summary
        </StyledButton>
      </StyledListItem>
      <StyledListItem>
        <Link href={"/create/newbook"}>
          <StyledButton>
            <AddBookSVG />
            New Book
            <ArrowRightSVG />
          </StyledButton>
        </Link>
      </StyledListItem>
      <StyledListItem>
        <StyledButton onClick={handleOnClick}>
          <CurrentBookSVG />
          Current Book
          <ArrowRightSVG />
        </StyledButton>
      </StyledListItem>
      <StyledListItem>
        <StyledButton onClick={handleOnClear}>
          <ResetSVG />
          Reset
        </StyledButton>
      </StyledListItem>
    </StyledList>
  );
}
