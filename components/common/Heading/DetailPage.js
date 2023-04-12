import styled from "styled-components";

import BackLibraryButton from "@/components/common/Link/BackTo.js";

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 36px;
  background: none;
`;

const StyledContainer = styled.div`
  position: absolute;
  left: 9px;
  top: 11px;
  display: flex;
  justify-content: space-between;
  width: calc(100% - 18px);
`;

export default function Header() {
  return (
    <StyledHeader>
      <StyledContainer>
        <BackLibraryButton target={"library"}></BackLibraryButton>
      </StyledContainer>
    </StyledHeader>
  );
}
