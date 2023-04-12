import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

import {
  HomeSVG,
  LibrarySVG,
  ReadingSVG,
  CreateSVG,
  CreateSVGActive,
  LibrarySVGActive,
  ReadingSVGActive,
  HomeSVGActive,
} from "@/public/svgs/navigationbar.js";

const StyledNavigation = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 53px;
  background-color: #03314b;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const StyledList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 30px;
  padding: 0;
  height: 100%;
  list-style: none;
`;

const StyledListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  width: 45px;
  height: 40px;
  cursor: pointer;

  &:active {
    transform: scale(0.9);
  }
`;

const StyledText = styled.h5`
  text-align: center;
`;

export default function Navigation() {
  const router = useRouter();

  return (
    <StyledNavigation>
      <StyledList>
        <Link href="/home">
          <StyledListItem>
            {router.pathname === "/home" ? <HomeSVGActive /> : <HomeSVG />}
            <StyledText>Home</StyledText>
          </StyledListItem>
        </Link>
        <Link href="/library">
          <StyledListItem>
            {router.pathname === "/library" ? (
              <LibrarySVGActive />
            ) : (
              <LibrarySVG />
            )}
            <StyledText>Library</StyledText>
          </StyledListItem>
        </Link>
        <Link href="/reading">
          <StyledListItem>
            {router.pathname === "/reading" ? (
              <ReadingSVGActive />
            ) : (
              <ReadingSVG />
            )}
            <StyledText>Read</StyledText>
          </StyledListItem>
        </Link>
        <Link href="/create">
          <StyledListItem>
            {router.pathname === "/create" ? (
              <CreateSVGActive />
            ) : (
              <CreateSVG />
            )}
            <StyledText>Create</StyledText>
          </StyledListItem>
        </Link>
      </StyledList>
    </StyledNavigation>
  );
}
