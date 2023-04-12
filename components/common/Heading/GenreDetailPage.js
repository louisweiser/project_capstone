import styled from "styled-components";

import BackLibraryButton from "@/components/common/Link/BackTo.js";

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  padding: 3px;
  background-color: #03314b;
`;

const StyledContainer = styled.div`
  position: absolute;
  left: 9px;
  top: 50%;
  transform: translateY(-42%);
  z-index: 10;
`;

export default function Header({ title }) {
  return (
    <StyledHeader>
      <StyledContainer>
        <BackLibraryButton target={"library"}></BackLibraryButton>
      </StyledContainer>
      <h1>{title}</h1>
    </StyledHeader>
  );
}
