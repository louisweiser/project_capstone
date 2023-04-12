import styled from "styled-components";

import Background from "@/components/common/Background/Illustration.js";
import SearchPage from "@/components/pages/reading/SearchBar.js";
import BookContent from "@/components/pages/reading/BookContent.js";
import Navigation from "@/components/common/Navigation";

const StyledContainer = styled.div`
  width: 100%;
  height: calc(100vh - 53px);
`;

export default function ReadingPage() {
  return (
    <>
      <Background color={"#b69b8a"}></Background>
      <StyledContainer>
        <SearchPage></SearchPage>
        <BookContent></BookContent>
      </StyledContainer>
      <Navigation></Navigation>
    </>
  );
}
