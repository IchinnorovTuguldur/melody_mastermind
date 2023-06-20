import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Howler from "react-howler-player";
import { Widget, CoverImage } from "./MusicPlayerSlider.style";
import CorrectAnswer from "../CorrectAnswer/CorrectAnswer";
import { Button } from "@mui/material";

const MusicPlayerSlider = (props) => {
  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <div></div>
      <Widget>
        {props.previewUrl ? <Howler src={[props.previewUrl]} /> : <></>}
        {props.isCorrect ? (
          <CorrectAnswer
            album={props.album}
            song={props.song}
            artist={props.artist}
            albumCover={props.albumCover}
            reset={props.reset}
          />
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CoverImage></CoverImage>
            <Box sx={{ ml: 1.5, minWidth: 0 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={500}
              >
                Some Album
              </Typography>
              <Typography noWrap>
                <b>Some Song (Can&apos;t win)</b>
              </Typography>
              <Typography noWrap letterSpacing={-0.25}>
                Some Artist (Can&apos;t win)
              </Typography>
            </Box>
            <Box>
              <Button></Button>
            </Box>
          </Box>
        )}
      </Widget>
    </Box>
  );
};

export default MusicPlayerSlider;
