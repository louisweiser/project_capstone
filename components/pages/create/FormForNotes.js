import { useContext } from "react";
import { MyContext } from "@/contexts/myContext.js";
import { DataContext } from "@/contexts/dataContext.js";

import addBookContent from "@/components/common/Data/addContent.js";

import CoverFromData from "@/components/common/Cover/BookCover.js";

import styled from "styled-components";

const StyledInput1 = styled.input`
  display: block;
  width: calc(100vw - 20px);
  margin: 10px 5px 0px 5px;
  padding: 7px;
  background: none;
  border: none;
  border-bottom: solid 1px #fffefb;
  outline: none;
`;

const StyledInput2 = styled.textarea`
  display: block;
  width: calc(100vw - 20px);
  height: 300px;
  margin: 0px 5px;
  padding: 7px;
  background: none;
  border: none;
  outline: none;
  resize: none;
`;

const StyledInput3 = styled.input`
  display: block;
  width: calc(100vw - 20px);
  margin: 0px 5px 2px 5px;
  padding: 7px;
  background: none;
  border: none;
  border-top: solid 1px #fffefb;
  outline: none;
`;

const StyledSubmitButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 50px;
`;

const StyledSubmitButton = styled.button`
  display: flex;
  justify-content: center;
  padding: 2px;
  background-color: hsl(202, 90%, 24%);
  border-radius: 10px;
`;

export default function FormForNotes() {
  const { input1, setInput1 } = useContext(MyContext);
  const { input2, setInput2 } = useContext(MyContext);
  const { input3, setInput3 } = useContext(MyContext);
  const { currentbook } = useContext(MyContext);
  const { theme } = useContext(MyContext);
  const { bookData } = useContext(DataContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (input1.trim() === "" && input2.trim() === "") {
      console.log("please enter value");
      return;
    }

    const contentDataObject = {
      title: input1,
      text: input2,
      page: input3,
    };
    function findBookBySlug(slug) {
      return bookData.find((book) => book.slug === slug);
    }
    const currentbookObject = findBookBySlug(currentbook);

    addBookContent(currentbookObject.bookID, theme, contentDataObject);

    setInput1("");
    setInput2("");
    setInput3("");
  };

  const handleInput1Change = (event) => {
    const currentInput1 = event.target.value;
    setInput1(currentInput1);
  };

  const handleInput2Change = (event) => {
    const currentInput2 = event.target.value;
    setInput2(currentInput2);
  };

  const handleInput3Change = (event) => {
    const currentInput3 = event.target.value;
    setInput3(currentInput3);
  };

  return (
    <form onSubmit={handleSubmit}>
      {theme !== "summary" && (
        <>
          <label htmlFor="input1"></label>
          <StyledInput1
            placeholder="Headline"
            type="text"
            id="input1"
            value={input1}
            onChange={handleInput1Change}
            maxLength="50"
          />
        </>
      )}
      <label htmlFor="input2"></label>
      <StyledInput2
        placeholder={
          theme === "summary"
            ? "Enter summary here"
            : theme === "quotes"
            ? "Enter quote here"
            : theme === "stories"
            ? "Enter story here"
            : "Enter content here"
        }
        type="text"
        id="input2"
        value={input2}
        onChange={handleInput2Change}
        required
      />
      {theme !== "summary" && (
        <>
          <label htmlFor="input3"></label>
          <StyledInput3
            placeholder="Page"
            type="number"
            id="input3"
            value={input3}
            onChange={handleInput3Change}
          />
        </>
      )}
      <StyledSubmitButtonContainer>
        <StyledSubmitButton type="submit">
          <CoverFromData slug={currentbook} height={120}></CoverFromData>
        </StyledSubmitButton>
      </StyledSubmitButtonContainer>
    </form>
  );
}
