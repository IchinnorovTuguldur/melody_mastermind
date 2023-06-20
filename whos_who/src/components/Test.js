import React from "react";
import Card from "./UI/Card";
import styled from "styled-components";
import { Button } from "@mui/material";

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
`;

const Test = (props) => {
  const { artists, artist, songs, song, oneMoreRound } = props;

  console.log("Songs: ", songs);
  console.log("Song: ", song);

  return (
    <FlexBox>
      <Card h="70vh" w="50vw" bg="gray" b="1px solid black" br="10%">
        <Button onClick={oneMoreRound}>Go Back</Button>
      </Card>
    </FlexBox>
  );
};

export default Test;
