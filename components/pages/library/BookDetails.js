import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import { MyContext } from "@/contexts/myContext.js";

import Image from "next/image";

import CoverFromData from "@/components/common/Cover/BookCover.js";

import { DataContext } from "@/contexts/dataContext.js";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 290px;
  padding: 100px 10px 10px 10px;
  gap: 10px;
  background-color: #03314b;
  border-radius: 50px 50px 0 0;
  position: relative;
`;

const StyledCoverContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100vw - 40px);
  margin-top: 20px;
  margin-left: 10px;
  position: absolute;
  top: -250px;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: calc(100vw - 20px);
  padding: 20px 5px;
  gap: 10px;
  border-top: 2px solid white;
  border-bottom: 2px solid white;
`;

const StyledButton = styled.button`
  background: ${({ active }) => (active ? "red" : "none")};
  border: white solid 2px;
  padding: 10px;
`;

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledContentEntryContainer = styled.div`
  border-bottom: 2px solid white;
`;

const StyledImageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  filter: blur(20px);
  opacity: 0.8;
`;

export default function BookDetails({ serverBook, serverContent }) {
  const router = useRouter();

  const { bookData, contentData } = useContext(DataContext);
  const { screenWidth } = useContext(MyContext);

  const [book, setBook] = useState(null);
  const [bookContent, setBookContent] = useState(null);
  const [image, setImage] = useState(null);
  const [contentState, setContentState] = useState(null);

  const FilterData = (array, key, value) => {
    return array.filter((item) => item[key] === value);
  };

  useEffect(() => {
    if (bookData.length === 0 && serverBook) {
      setBook(serverBook);
      setBookContent(serverContent);
    } else {
      const book = bookData.find((book) => book.slug === router.query.slug);
      setBook(book);

      if (book) {
        const content = contentData.find((item) => item.bookID === book.bookID);
        setBookContent(content);

        setImage(FilterData(bookData, "slug", book.slug));
      }
    }
  }, [bookData, contentData, router.query.slug, serverBook, serverContent]);

  if (!book || !bookContent) {
    return <div>Loading...</div>;
  }

  const summaryArray = bookContent.summary;
  const storiesArray = bookContent.stories;
  const quotesArray = bookContent.quotes;

  const handleStoryOnClick = () => {
    if (contentState === "stories") {
      setContentState(null);
    } else {
      setContentState("stories");
    }
  };

  const handleQuoteOnClick = () => {
    if (contentState === "quotes") {
      setContentState(null);
    } else {
      setContentState("quotes");
    }
  };

  function renderSummary() {
    if (!summaryArray) {
      return null;
    }

    const renderedSummary = Object.values(summaryArray).map(
      (summary, index) => {
        if (typeof summary === "object" && summary.text) {
          return (
            <StyledContentEntryContainer key={index}>
              <p>{summary.text}</p>
            </StyledContentEntryContainer>
          );
        }
        return null;
      }
    );

    return (
      <>
        <h3>Summary:</h3>
        <div>{renderedSummary}</div>
      </>
    );
  }

  function renderStories() {
    if (!storiesArray) {
      return null;
    }

    const renderedStories = Object.values(storiesArray).map((story, index) => {
      if (typeof story === "object") {
        return (
          <StyledContentEntryContainer key={index}>
            <h3>{story.title}</h3>
            <p>{story.text}</p>
            <p>Seite: {story.page !== null ? story.page : "Nicht verfügbar"}</p>
          </StyledContentEntryContainer>
        );
      }
      return null;
    });

    return (
      <div>
        <h3>Stories:</h3>

        <div>{renderedStories}</div>
      </div>
    );
  }

  function renderQuotes() {
    if (!quotesArray) {
      return null;
    }
    const renderedQuotes = Object.values(quotesArray).map((quote, index) => {
      if (typeof quote === "object" && quote.text) {
        return (
          <StyledContentEntryContainer key={index}>
            <p>{quote.text}</p>
            <p>Seite: {quote.page !== null ? quote.page : "Nicht verfügbar"}</p>
          </StyledContentEntryContainer>
        );
      }
      return null;
    });

    return (
      <div>
        <h3>Quotes:</h3>
        <div>{renderedQuotes}</div>
      </div>
    );
  }

  return (
    <StyledContainer>
      <StyledImageContainer>
        {image && (
          <StyledImage
            className="background-image"
            src={image[0].coverpath}
            alt={"alt"}
            width={screenWidth}
            height={Math.floor(screenWidth / image[0].relativefactor)}
            fit="cover"
            objectpositionx="center"
            objectpositiony="center"
            priority={true}
          />
        )}
      </StyledImageContainer>
      <StyledCoverContainer>
        <CoverFromData slug={book.slug} height={300} />
      </StyledCoverContainer>
      <StyledButtonContainer>
        <StyledButton
          onClick={handleStoryOnClick}
          active={contentState === "stories"}
        >
          Story
        </StyledButton>
        <StyledButton
          onClick={handleQuoteOnClick}
          active={contentState === "quotes"}
        >
          Quote
        </StyledButton>
      </StyledButtonContainer>
      <StyledContentContainer>
        {contentState === "quotes" ? (
          <div>{renderQuotes()}</div>
        ) : contentState === "stories" ? (
          <div>{renderStories()}</div>
        ) : (
          <>
            <div>{renderSummary()}</div>
            <div>{renderQuotes()}</div>
            <div>{renderStories()}</div>
          </>
        )}
      </StyledContentContainer>
    </StyledContainer>
  );
}

export async function getServerSideProps(context) {
  const { req, query } = context;
  if (!req || (query && query.hasDataContext === "true")) {
    return { props: { serverBook: null, serverContent: null } };
  }

  const slug = context.params.slug;
  const response = await fetch("/api/get/books");
  const bookData = await response.json();
  const index = bookData.findIndex((book) => book.slug === slug);

  if (index === -1) {
    return {
      notFound: true,
    };
  }

  const contentResponse = await fetch("/api/get/bookcontent");
  const contentData = await contentResponse.json();
  const filteredContent = contentData.filter(
    (item) => item.bookID === bookData[index].bookID
  );

  return {
    props: {
      serverBook: bookData[index],
      serverContent:
        filteredContent.length > 0
          ? filteredContent[0]
          : { summary: null, quotes: null, stories: null },
    },
  };
}
