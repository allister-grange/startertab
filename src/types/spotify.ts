// access token is provided here to pass back to the client
// so that it can set it in the localStorage if it's refreshed
export type NowPlayingSpotifyData = {
  songTitle?: string;
  songArtist?: string;
  playing: boolean;
  link?: string;
  albumFullSizeImageUrl?: string;
  albumPreviewUrl?: string;
  playable: boolean;
};

export type SpotifyContextInterface = {
  isAuthenticated?: boolean;
  spotifyData: NowPlayingSpotifyData;
  loginWithSpotify: () => void;
  skipSong: (forward: boolean) => Promise<void>;
  pausePlaySong: (pause: boolean) => Promise<void>;
  topArtists: TopArtistSpotify[];
  fetchTopArtistData: (timeRange: string) => void;
};

export type TopArtistSpotify = {
  name: string;
  popularity: number;
};

// access token is provided here to pass back to the client
// so that it can set it in the localStorage if it's refreshed
export type TopArtistSpotifyData = {
  topArtists: TopArtistSpotify[];
};
