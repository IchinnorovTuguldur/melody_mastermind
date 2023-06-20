import * as React from "react";
import { StyledDiv, Text, Div } from "../GamePage/GamePage.styles";
import { Button } from "@mui/material";
import styled from "styled-components";
import win from "../../../src/win.jpeg";

const StyledImg = styled.div`
  background-image: url(${win});
  height: 96px;
  width: 96px;
`;

const YouWonPage = (props) => {
  const {
    oneMoreRound,
    setNumSongs,
    setNumArtists,
    setLives,
    setScore,
    setSelectedGenre,
  } = props;
  return (
    <Div>
      <StyledDiv>
        <Text>Congratulations!</Text>
        <Text>You win.</Text>
        <StyledImg />
      </StyledDiv>
      <StyledDiv>
        <Button
          onClick={() => {
            oneMoreRound();
            setNumSongs(1);
            setNumArtists(2);
            setLives(3);
            setScore(0);
            setSelectedGenre("Please choose the genre");
          }}
        >
          Play again?
        </Button>
      </StyledDiv>
    </Div>
  );
};
export default YouWonPage;
