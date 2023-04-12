import styled from "styled-components";

const StyledContainer = styled.div`
  /*layout*/
  display: block;
  justify-content: center;
  align-items: center;
  text-align: center;
  /*dimension*/
  width: auto;
  height: 30vh;
  margin-top: 175px;
  padding: 20px;
  /*style*/
  background-color: #03314b;
  border-top: #032330 solid 2px;
  border-bottom: #032330 solid 2px;
  font-size: 17px;
`;

export default function DailyQuote() {
  return (
    <StyledContainer>
      <h2>Headline</h2>
      <h4>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit esse
        error dolore inventore nihil pariatur. Deserunt enim repudiandae odio,
        quia consequatur a sequi consectetur quidem distinctio voluptatum
        doloremque neque. Nostrum!
      </h4>
    </StyledContainer>
  );
}
