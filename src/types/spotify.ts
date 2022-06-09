export type NowPlayingSpotifyData = {
  songTitle?: string;
  songArtist?: string;
  playing: boolean;
  link?: string;
  albumImageUrl?: string;
  playable: boolean;
  accessToken?: string;
} 

export type SpotifyContextInterface = {
  isAuthenticated?: boolean;
  spotifyData: NowPlayingSpotifyData;
  loginWithSpotify: () => void;
  skipSong: (forward: boolean) => Promise<void>;
  pausePlaySong: (pause: boolean) => Promise<void>;
}