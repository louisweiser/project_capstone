import styled from "styled-components";

import BackgroundIllustration from "@/components/common/Background/Illustration.js";
import SearchBar from "@/components/pages/library/SearchBar.js";
import BookLibrary from "@/components/pages/library/BookLibrary.js";
import Navigation from "@/components/common/Navigation";

const StyledContainer = styled.div`
  width: 100%;
  height: calc(100vh - 54px);
`;

export default function LibraryPage() {
  return (
    <>
      <BackgroundIllustration color={"#03314b"}></BackgroundIllustration>
      <StyledContainer>
        <SearchBar></SearchBar>
        <BookLibrary></BookLibrary>
      </StyledContainer>
      <Navigation></Navigation>
    </>
  );
}
