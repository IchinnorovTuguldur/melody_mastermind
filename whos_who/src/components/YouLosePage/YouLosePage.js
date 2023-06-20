import * as React from "react";
import { StyledDiv, Text, Div } from "../GamePage/GamePage.styles";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import gameover from "../../../src/gameover.jpeg";

const StyledImg = styled.img`
  background-image: url(${gameover});
  height: 96px;
  width: 96px;
  border: 1px solid white;
`;

const YouLosePage = (props) => {
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
      <Stack alignContent="center" alignSelf="center" width="100%">
        <Text>Game Over!!</Text>
        <StyledImg />
      </Stack>
      <Stack>
        <Button
          onClick={() => {
            oneMoreRound();
            setNumSongs(1);
            setNumArtists(2);
            setLives(3);
            setScore(0);
            setSelectedGenre("Select genre");
          }}
        >
          Play Again
        </Button>
      </Stack>
    </Div>
  );
};
export default YouLosePage;
