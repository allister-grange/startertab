// access token is provided here to pass back to the client
// so that it can set it in the localStorage if it's refreshed
export type NowPlayingSpotifyData = {
  songTitle?: string;
  songArtist?: string;
  playing: boolean;
  link?: string;
  albumImageUrl?: string;
  playable: boolean;
  accessToken?: string;
};

export type SpotifyContextInterface = {
  isAuthenticated?: boolean;
  spotifyData: NowPlayingSpotifyData;
  loginWithSpotify: () => void;
  skipSong: (forward: boolean) => Promise<void>;
  pausePlaySong: (pause: boolean) => Promise<void>;
  topArtists: TopArtistSpotify[];
};

export type TopArtistSpotify = {
  name: string;
  popularity: number;
};

// access token is provided here to pass back to the client
// so that it can set it in the localStorage if it's refreshed
export type TopArtistSpotifyData = {
  topArtists: TopArtistSpotify[];
  accessToken?: string;
};
