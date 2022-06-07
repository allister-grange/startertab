import { NowPlayingSpotifyData } from "@/types";
import { useEffect, useState } from "react";

const useSpotify = () => {
  const [spotifyData, setSpotifyData] = useState<NowPlayingSpotifyData>({
    playing: false,
    songTitle: undefined,
    songArtist: undefined,
    link: undefined,
    albumImageUrl: undefined,
    playable: false,
  });

  useEffect(() => {
    const fetchCurrentSong = async () => {
      const res = await fetch("/api/spotify");
      let data = (await res.json()) as NowPlayingSpotifyData;

      setSpotifyData(data);
    };

    fetchCurrentSong();
    const interval = setInterval(fetchCurrentSong, 10000);
    return () => clearInterval(interval);
  }, []);

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

  return { spotifyData, skipSong, pausePlaySong };
};

export default useSpotify;
