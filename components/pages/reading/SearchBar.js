import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import { MyContext } from "@/contexts/myContext.js";

import { BackSVG } from "@/public/svgs/router";

const StyledSearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 62px;
  width: 100vw;
  background-color: #032330;
`;

const StyledSearchInputFieldContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ searchIsActive }) => (searchIsActive ? "52px" : "47px")};
  width: ${({ searchIsActive }) =>
    searchIsActive ? "100vw" : "calc(100vw - 15px)"};
  gap: 10px;
  background-color: #03314b;
  border-radius: ${({ searchIsActive }) => (searchIsActive ? "0" : "5px")};
`;

const StyledSearchInputField = styled.input`
  width: calc(100vw - 45px);
  height: 37px;
  border: none;
  background: none;
  outline: none;
`;

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useContext(MyContext);
  const [searchIsActive, setSearchIsActive] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOnClick = () => {
    setSearchIsActive(true);
  };

  const handleBackClick = () => {
    setSearchIsActive(false);
    setSearchTerm("");
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setSearchTerm("");
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  });

  return (
    <StyledSearchBarContainer>
      <StyledSearchInputFieldContainer searchIsActive={searchIsActive}>
        {searchIsActive && (
          <button onClick={handleBackClick}>
            <BackSVG></BackSVG>
          </button>
        )}
        <StyledSearchInputField
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onClick={handleOnClick}
          placeholder="  search ..."
        />
      </StyledSearchInputFieldContainer>
    </StyledSearchBarContainer>
  );
}
