import { NowPlayingSpotifyData } from "@/types";
import { useEffect, useState } from "react";
import { getClientUrl } from "@/helpers/getClientUrl";
const queryString = require("query-string");

const useSpotify = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [spotifyData, setSpotifyData] = useState<NowPlayingSpotifyData>({
    playing: false,
    songTitle: undefined,
    songArtist: undefined,
    link: undefined,
    albumImageUrl: undefined,
    playable: false,
  });

  useEffect(() => {
    let accessToken = window.localStorage.getItem("spotifyAuthToken");

    if (!accessToken) {
      // present auth button to the user, don't fetch any music
      return;
    } else {
      setAccessToken(accessToken);
    }

    const fetchCurrentSong = async () => {
      const res = await fetch("/api/spotify");
      let data = (await res.json()) as NowPlayingSpotifyData;

      setSpotifyData(data);
    };

    fetchCurrentSong();
    const interval = setInterval(fetchCurrentSong, 10000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  useEffect(() => {
    const hash = queryString.parse(location.hash);
    const accessToken = hash.access_token;

    if (accessToken) {
      setAccessToken(accessToken);
      setIsAuthenticated(true);
      window.localStorage.setItem("spotifyAuthToken", accessToken);
    }
  }, []);

  const loginWithSpotify = () => {
    const redirectUri = getRedirectUrl(
      "261297b4032a4ce7b473de936d525c9d",
      [
        "user-read-currently-playing",
        "user-top-read",
        "user-read-playback-state",
        "user-read-recently-played",
        "user-modify-playback-state",
      ],
      getClientUrl(),
      true
    );

    console.log(redirectUri);

    if (window.location !== window.parent.location) {
      const loginWindow = window.open(redirectUri);
      window.addEventListener(
        "message",
        (event) => {
          console.log("yo please ", event);

          if (
            event.data.type !== "react-spotify-auth" ||
            !event.data.accessToken
          ) {
            return;
          }

          // console.log("herrere");

          loginWindow!.close();
          // this.props.onAccessToken(event.data.accessToken)
          // setAccessToken(event.data.accessToken);
        },
        false
      );
    } else {
      window.location = redirectUri as (string | Location) & Location;
    }
    // window.localStorage.setItem("spotifyAuthToken", "pooooo");
    // setIsAuthenticated(true);
  };

  const skipSong = async (forward: boolean) => {
    try {
      await fetch(`/api/spotify?forward=${forward}`, { method: "POST" });
      const res = await fetch("/api/spotify");
      const data = (await res.json()) as NowPlayingSpotifyData;
      setSpotifyData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const pausePlaySong = async (pause: boolean) => {
    try {
      setSpotifyData({ ...spotifyData, playing: !pause });
      await fetch(`/api/spotify?pause=${pause}`, { method: "POST" });
    } catch (err) {
      console.error(err);
      setSpotifyData({ ...spotifyData, playing: pause });
    }
  };

  return {
    spotifyData,
    skipSong,
    pausePlaySong,
    isAuthenticated,
    loginWithSpotify,
  };
};

const getRedirectUrl = (
  clientID: string,
  scopes: string[],
  redirectUri: string,
  showDialog: boolean
) => {
  return (
    "https://accounts.spotify.com/authorize?response_type=token" +
    `&client_id=${clientID}` +
    `&scope=${scopes.join("%20")}` +
    `&redirect_uri=${redirectUri}` +
    "&show_dialog=" +
    Boolean(showDialog)
  );
};

export default useSpotify;
