import React, { Fragment, useEffect, useState } from "react";
import fetchFromSpotify, { request } from "../services/api";
import LandingPage from "./LandingPage/LandingPage";
import Card from "./UI/Card";
import styled from "styled-components";
import { Button } from "@mui/material";
import GamePage from "./GamePage/GamePage";
import wallpaper from "../../wallpaper.jpeg";
import { useMediaQuery } from "@mui/material";

const StyledHome = styled.div`
  display: flex;
  justify-content: flex-end;
  background-image: url(${wallpaper});
  height: 100vh;
  background-size: cover;
`;

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";

const Home = () => {
  const [genres, setGenres] = useState([]);
  const [authLoading, setAuthLoading] = useState(false);
  const [configLoading, setConfigLoading] = useState(false);
  const [token, setToken] = useState("");
  const [numberOfSongs, setNumberOfSongs] = useState(
    localStorage.getItem("numberOfSongs") || 1
  );
  const [numberOfArtists, setNumberOfArtists] = useState(
    localStorage.getItem("numberOfArtists") || 2
  );
  const [artists, setArtists] = useState([]); //8
  const [songs, setSongs] = useState([]); //10
  const [selectedGenre, setSelectedGenre] = useState("Select genre");
  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedSong, setSelectedSong] = useState();
  const [playGame, setPlayGame] = useState(false);
  const [songPicked, setSongPicked] = useState(null);
  const [artistPicked, setArtistPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [lives, setLives] = useState(3);

  const loadGenres = async (t) => {
    setConfigLoading(true);
    const response = await fetchFromSpotify({
      token: t,
      endpoint: "recommendations/available-genre-seeds",
    });
    setGenres(response.genres);
    setConfigLoading(false);
  };

  const searchArtists = async (event) => {
    const response = await fetchFromSpotify({
      token: token,
      endpoint: `search`,
      params: {
        q: `genre:"${selectedGenre}"`,
        type: "artist",
      },
    });
    let artistsArray = response.artists.items;
    if (artistsArray.length < numberOfArtists) {
    } else {
      let artistsSelected = [];
      for (let i = 0; i < numberOfArtists; i++) {
        let index = Math.floor(Math.random() * artistsArray.length);
        artistsSelected.push(artistsArray[index]);
        artistsArray.splice(index, 1);
      }
      let index = Math.floor(Math.random() * artistsSelected.length);
      setSelectedArtist(artistsSelected[index].name);
      searchSong(artistsSelected[index].name);
      setArtists(artistsSelected);
      setPlayGame(true);
      setIsCorrect(false);
    }

    localStorage.setItem("numberOfArtists", JSON.stringify(numberOfArtists));
  };

  const searchSong = async (artist) => {
    const response = await fetchFromSpotify({
      token: token,
      endpoint: "search",
      params: {
        q: `artist:${artist}`,
        type: "track",
      },
    });
    let tracksArray = response.tracks.items.filter(
      (track) => track.preview_url !== null
    );
    let songSelected = [];
    for (let i = 0; i < numberOfSongs; i++) {
      let idx = Math.floor(Math.random() * tracksArray.length);
      songSelected.push(tracksArray[idx]);
    }
    let index = Math.floor(Math.random() * songSelected.length);
    setSelectedSong(songSelected[index]);
    setSongs(songSelected);
  };

  const handleAnswer = () => {
    if (selectedArtist === artistPicked && selectedSong.name === songPicked) {
      let newScore = score + 1;
      setScore(newScore);
      setIsCorrect(!isCorrect);
    } else {
      setLives(lives - 1);
      searchArtists();

      console.log(lives);
    }
  };

  const returnToHome = () => {
    setPlayGame(false);
  };

  useEffect(() => {
    setAuthLoading(true);

    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        setAuthLoading(false);
        setToken(storedToken.value);
        loadGenres(storedToken.value);
        return;
      }
    }
    console.log("Sending request to AWS endpoint");
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      setAuthLoading(false);
      setToken(newToken.value);
      loadGenres(newToken.value);
    });
  }, []);

  const handleChangeNumArtistsChange = (value) => {
    localStorage.setItem("numberOfArtists", value);
    setNumberOfArtists(value);
  };

  const handleChangeNumSongsChange = (value) => {
    localStorage.setItem("numberOfSongs", value);
    setNumberOfSongs(value);
  };

  const isMobile = useMediaQuery("(min-width:600px)");
  if (authLoading || configLoading) {
    return <div>Loading...</div>;
  }

  return (
    <StyledHome>
      {!playGame &&
        (!isMobile ? (
          <Card h="80vh" w="100vw" bg="#2D46BA" br="0%">
            <LandingPage
              genres={genres}
              selectedGenre={selectedGenre}
              numArtists={numberOfArtists}
              numSongs={numberOfSongs}
              setNumArtists={handleChangeNumArtistsChange}
              setNumSongs={handleChangeNumSongsChange}
              setSelectedGenre={setSelectedGenre}
            />
            <Button
              variant="contained"
              size="large"
              type="submit"
              value="Play"
              onClick={searchArtists}
            >
              Play
            </Button>
          </Card>
        ) : (
          <Card h="80vh" w="65vw" bg="#2D46BA" br="40%">
            <LandingPage
              genres={genres}
              selectedGenre={selectedGenre}
              numArtists={numberOfArtists}
              numSongs={numberOfSongs}
              setNumArtists={handleChangeNumArtistsChange}
              setNumSongs={handleChangeNumSongsChange}
              setSelectedGenre={setSelectedGenre}
            />
            <Button
              variant="contained"
              size="large"
              type="submit"
              value="Play"
              onClick={searchArtists}
            >
              Play
            </Button>
          </Card>
        ))}

      {playGame && (
        <Card h="100vh" w="70vw" bg="white">
          <GamePage
            artists={artists}
            artist={selectedArtist}
            songs={songs}
            song={selectedSong}
            songPicked={songPicked}
            artistPicked={artistPicked}
            setSongPicked={setSongPicked}
            setArtistPicked={setArtistPicked}
            handleAnswer={handleAnswer}
            oneMoreRound={returnToHome}
            lives={lives}
            score={score}
            isCorrect={isCorrect}
            reset={searchArtists}
            setNumArtists={setNumberOfArtists}
            setNumSongs={setNumberOfSongs}
            setLives={setLives}
            setScore={setScore}
            setSelectedGenre={setSelectedGenre}
          />
        </Card>
      )}
    </StyledHome>
  );
};

export default Home;
