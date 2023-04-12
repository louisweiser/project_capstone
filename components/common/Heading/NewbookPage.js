import styled from "styled-components";

import BackLibraryButton from "@/components/common/Link/BackTo.js";

const StyledHeader = styled.header`
  position: relative;
  width: 100%;
  height: 36px;
  background-color: #03314b;
`;

const StyledContainer = styled.div`
  position: absolute;
  left: 9px;
  top: 11px;
`;

export default function Header() {
  return (
    <StyledHeader>
      <StyledContainer>
        <BackLibraryButton target={"create"}></BackLibraryButton>
      </StyledContainer>
    </StyledHeader>
  );
}
