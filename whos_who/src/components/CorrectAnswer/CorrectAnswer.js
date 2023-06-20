import React from "react";
import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const CoverImage = styled("div")({
  width: 100,
  height: 100,
  objectFit: "cover",
  overflow: "hidden",
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: "rgba(0,0,0,0.08)",
  "& > img": {
    width: "100%",
  },
});

const CorrectAnswer = (props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <CoverImage>
        <img src={props.albumCover} alt="some album cover" />
      </CoverImage>
      <Box sx={{ ml: 1.5, minWidth: 0 }}>
        <Typography variant="caption" color="text.secondary" fontWeight={500}>
          {props.album}
        </Typography>
        <Typography noWrap>
          <b>{props.song}</b>
        </Typography>
        <Typography noWrap letterSpacing={-0.25}>
          {props.artist}
        </Typography>
      </Box>
    </Box>
  );
};

export default CorrectAnswer;
