import { useContext } from "react";
import Image from "next/image";
import styled from "styled-components";

import { MyContext } from "@/contexts/myContext.js";

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  padding: 0 20px;
  background: none;
  font-size: 30px;
  border-bottom: 2px solid #03314b;
`;

const StyledImageContainer = styled.div`
  position: absolute;
  bottom: -7px;
  left: 0;
  z-index: -1;
`;

const StyledText = styled.h1`
  font-family: "Fasthand";
`;

export default function Header({ title }) {
  const { screenWidth } = useContext(MyContext);

  const height = Math.floor(screenWidth * 0.40357142857);

  return (
    <StyledHeader>
      <StyledText>{title}</StyledText>
      <StyledImageContainer>
        <Image
          src="/images/crop.jpg"
          width={screenWidth}
          height={height}
          alt="img"
        ></Image>
      </StyledImageContainer>
    </StyledHeader>
  );
}
