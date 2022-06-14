export const getClientUrl = (): string => {
  return process.env.HOSTED_URL
    ? `https://${process.env.HOSTED_URL}`
    : 'http://localhost:3000/';
};

export const getSpotifyRedirectUrl = (): string => {
  return process.env.HOSTED_URL
    ? `https://${process.env.HOSTED_URL}/api/spotify/authorize`
    : 'http://localhost:3000/api/spotify/authorize';
};

export const getStravaRedirectUrl = (): string => {
  return process.env.HOSTED_URL
    ? `https://${process.env.HOSTED_URL}/api/strava/authorize`
    : 'http://localhost:3000/api/strava/authorize';
};

export const getSpotifyRedirectUri = (
  clientID: string,
  scopes: string[],
  redirectUri: string,
  showDialog: boolean
) => {
  return (
    "https://accounts.spotify.com/authorize?response_type=code" +
    `&client_id=${clientID}` +
    `&scope=${scopes.join("%20")}` +
    "&show_dialog=" +
    Boolean(showDialog) +
    `&redirect_uri=${redirectUri}`
  );
};

export const getStravaRedirectUri = (
  clientID: string,
  scopes: string[],
  redirectUri: string,
) => {
  return (
    "https://www.strava.com/oauth/authorize?response_type=code" +
    `&client_id=${clientID}` +
    `&scope=${scopes.join(",")}` +
    `&redirect_uri=${redirectUri}`
  );
};
