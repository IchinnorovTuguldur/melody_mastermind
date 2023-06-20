import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { Fragment } from "react";
import MusicPlayerSlider from "../MusicPlayerSlider/MusicPlayerSlider";
import YouLosePage from "../YouLosePage/YouLosePage";
import YouWonPage from "../YouWonPage/YouWonPage";
import { StyledDiv, Text } from "./GamePage.styles";
import { MobileText } from "./GamePage.styles";

const GamePage = (props) => {
  const {
    artists,
    artist,
    songs,
    song,
    songPicked,
    artistPicked,
    setSongPicked,
    setArtistPicked,
    handleAnswer,
    oneMoreRound,
    lives,
    score,
    isCorrect,
    reset,
    setNumArtists,
    setNumSongs,
    setLives,
    setScore,
    setSelectedGenre,
  } = props;

  const isMobileDevice = useMediaQuery("(min-width:600px)");
  console.log("Song: ", song);
  console.log("artist: ", artist);

  const pickArtist = (artist) => {
    setArtistPicked(artist);
  };

  const pickSong = (song) => {
    setSongPicked(song);
  };

  return (
    <Fragment>
      {lives === 0 ? (
        <YouLosePage
          oneMoreRound={oneMoreRound}
          setNumSongs={setNumSongs}
          setNumArtists={setNumArtists}
          setLives={setLives}
          setScore={setScore}
          setSelectedGenre={setSelectedGenre}
        />
      ) : score === 5 ? (
        <YouWonPage
          oneMoreRound={oneMoreRound}
          setNumSongs={setNumSongs}
          setNumArtists={setNumArtists}
          setLives={setLives}
          setScore={setScore}
          setSelectedGenre={setSelectedGenre}
        />
      ) : (
        <Stack width="80%" alignContent="center" spacing={2}>
          <StyledDiv>
            <Stack direction="row">
              <Button variant="disabled">
                Lives: {lives}
                {lives === 0 ? <GameOver /> : <div> </div>}
              </Button>
              <Button variant="disabled">Your Score: {score}</Button>
            </Stack>
          </StyledDiv>
          <MusicPlayerSlider
            song={song ? song.name : 1}
            artist={artist ? artist : 1}
            previewUrl={song ? song.preview_url : 1}
            album={song ? song.album.name : 1}
            albumCover={song ? song.album.images[0].url : 1}
            isCorrect={isCorrect}
            reset={reset}
          />

          {!isMobileDevice ? (
            <Stack direction="column" spacing={2}>
              <Stack>
                <MobileText>Pick the correct artist</MobileText>
                {artists.map((artist) => (
                  <Stack spacing={1} direction="row">
                    <Box m={1} alignContent="center">
                      <Button
                        variant="outlined"
                        key={artist.id}
                        id={artist.name}
                        onClick={() => pickArtist(artist.name)}
                      >
                        {artist.name}
                      </Button>
                    </Box>
                  </Stack>
                ))}
              </Stack>
              <Stack>
                <MobileText>Pick the correct song</MobileText>
                {songs.map((song) => (
                  <Stack alignContent="left" spacing={1} direction="row">
                    <Box m={1}>
                      <Button
                        variant="outlined"
                        key={song.id}
                        id={song.name}
                        onClick={() => pickSong(song.name)}
                      >
                        {song.name}
                      </Button>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          ) : (
            <Stack>
              <Stack direction="row" justifyContent="space-between">
                <Stack>
                  <Text>Pick the correct artist:</Text>
                  {artists.map((artist) => (
                    <Stack spacing={1} direction="row">
                      <Box m={1} alignContent="center">
                        <Button
                          variant="outlined"
                          key={artist.id}
                          id={artist.name}
                          onClick={() => {
                            pickArtist(artist.name);
                          }}
                          disabled={artistPicked === artist.name}
                        >
                          {artist.name}
                        </Button>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
                <Stack>
                  <Text>Pick the correct song:</Text>
                  {songs.map((song) => (
                    <Stack alignContent="left" spacing={1} direction="row">
                      <Box m={1}>
                        <Button
                          variant="outlined"
                          key={song.id}
                          id={song.name}
                          onClick={() => {
                            pickSong(song.name);
                          }}
                          disabled={songPicked === song.name}
                        >
                          {song.name}
                        </Button>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          )}

          <Stack>
            {isCorrect ? (
              <Button
                onClick={() => {
                  reset();
                  setArtistPicked(null);
                  setSongPicked(null);
                }}
              >
                Give me the next one!!
              </Button>
            ) : artistPicked === null || songPicked === null ? (
              <Button
                onClick={() => {
                  handleAnswer();
                  setArtistPicked(null);
                  setSongPicked(null);
                }}
                disabled={true}
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                onClick={() => {
                  handleAnswer();
                  setArtistPicked(null);
                  setSongPicked(null);
                }}
              >
                Submit Answer
              </Button>
            )}
          </Stack>
        </Stack>
      )}
    </Fragment>
  );
};
export default GamePage;
