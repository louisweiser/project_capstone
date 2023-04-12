import { useContext } from "react";
import { MyContext } from "@/contexts/myContext.js";
import styled from "styled-components";

import BackLibraryButton from "@/components/common/Link/BackTo.js";

const StyledHeader = styled.header`
  /*layout*/
  position: fixed;
  top: 0;

  /*dimension*/
  width: 100%;
  height: 36px;
  /*style*/
  background: none;
`;

const StyledContainer = styled.div`
  /*layout*/
  position: absolute;
  left: 9px;
  top: 11px;
  display: flex;
  justify-content: space-between;
  /*dimension*/
  width: calc(100% - 18px);
`;

export default function Header() {
  const { edit, setEdit } = useContext(MyContext);

  const handleOnClick = () => {
    setEdit(!edit);
  };

  return (
    <StyledHeader>
      <StyledContainer>
        <BackLibraryButton target={"library"}></BackLibraryButton>
      </StyledContainer>
    </StyledHeader>
  );
}
