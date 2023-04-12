import { useContext } from "react";
import Image from "next/image";
import styled from "styled-components";

import { DataContext } from "@/contexts/dataContext.js";

const StyledImageContainer = styled.div`
  /*layout*/
  overflow-y: hidden;
  /*dimension*/
  width: ${({ relativewidth }) => relativewidth}px;
  height: ${({ height }) => height}px;
  flex-shrink: 0;
  /*style*/
  border-radius: 8px;
`;

export default function BookCover({ slug, height }) {
  const { bookData } = useContext(DataContext);

  if (!slug || slug === "") {
    return <div>error by slug: {slug}</div>;
  }

  const FilterData = (array, key, value) => {
    return array.filter((item) => item[key] === value);
  };

  const image = FilterData(bookData, "slug", slug);

  if (!image[0]) {
    return <div>error</div>;
  } //Error handling

  const relativewidth = Math.floor(image[0].relativefactor * height);

  return (
    <StyledImageContainer relativewidth={relativewidth} height={height}>
      <Image
        src={`/images/cover/${image[0].cover}`}
        width={relativewidth}
        height={height}
        alt="Image"
        priority
      />
    </StyledImageContainer>
  );
}
