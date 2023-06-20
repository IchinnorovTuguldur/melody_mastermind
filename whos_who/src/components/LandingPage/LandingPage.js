import React, { Fragment } from "react";
import styled from "styled-components";
import DropDown from "../Dropdown/Dropdown";
import { useMediaQuery } from "@mui/material";

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px 0 50px 0;
`;

const Text = styled.text`
  font-weight: 800;
  color: #1ed760;
  font-size: 24px;
`;

const LandingPage = (props) => {
  const isMobileDevice = useMediaQuery("(min-width:600px)");
  return (
    <Fragment>
      <FlexBox>
        <Text>How many artists?</Text>
      </FlexBox>
      <FlexBox>
        <DropDown
          selected={props.numArtists}
          setSelected={props.setNumArtists}
          menu={[2, 3, 4, 5]}
        />
      </FlexBox>
      <FlexBox>
        <Text>How many songs?</Text>
      </FlexBox>
      <FlexBox>
        <DropDown
          selected={props.numSongs}
          setSelected={props.setNumSongs}
          menu={[1, 2, 3, 4, 5]}
        />
      </FlexBox>
      <FlexBox>
        <Text>What genre?</Text>
      </FlexBox>
      <FlexBox>
        <DropDown
          selected={props.selectedGenre}
          setSelected={props.setSelectedGenre}
          menu={props.genres}
        ></DropDown>
      </FlexBox>
    </Fragment>
  );
};
export default LandingPage;
