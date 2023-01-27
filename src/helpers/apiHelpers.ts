export const getClientUrl = (): string => {
  return process.env.HOSTED_URL
    ? `https://${process.env.HOSTED_URL}`
    : "http://localhost:3000/";
};

export const getApiUrl = (): string => {
  return process.env.VERCEL_URL ? process.env.VERCEL_URL : process.env.API_URL!;
};

export const getSpotifyRedirectUrl = (): string => {
  return process.env.HOSTED_URL
    ? `https://${process.env.HOSTED_URL}/api/spotify/authorize`
    : "http://localhost:3000/api/spotify/authorize";
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

export const getStravaRedirectUrl = (): string => {
  return process.env.HOSTED_URL
    ? `https://${process.env.HOSTED_URL}/api/strava/authorize`
    : "http://localhost:3000/api/strava/authorize";
};

export const getStravaRedirectUri = (
  clientID: string,
  scopes: string[],
  redirectUri: string
) => {
  return (
    "https://www.strava.com/oauth/authorize?response_type=code" +
    `&client_id=${clientID}` +
    `&scope=${scopes.join(",")}` +
    `&redirect_uri=${redirectUri}`
  );
};

export const getTwitterRedirectUrl = (): string => {
  return process.env.HOSTED_URL
    ? `https://${process.env.HOSTED_URL}/api/twitter/authorize`
    : "http://127.0.0.1:3000/api/twitter/authorize";
};

export const getTwitterRedirectUri = (
  clientID: string,
  codeChallengeKey: string
) => {
  return (
    "https://twitter.com/i/oauth2/authorize?response_type=code" +
    `&client_id=${clientID}` +
    `&redirect_uri=${encodeURIComponent(getTwitterRedirectUrl())}` +
    `&code_challenge=${codeChallengeKey}&code_challenge_method=plain` +
    `&scope=tweet.read%20offline.access%20users.read&state=state`
  );
};

export const getOutlookRedirectUri = (
  clientId: string,
  redirectUrl: string
) => {
  return (
    "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?" +
    `client_id=${clientId}` +
    `&scope=${encodeURIComponent("Calendars.Read offline_access")}` +
    `&response_type=code` +
    `&redirect_uri=${encodeURIComponent(redirectUrl)}`
  );
};

export const getOutlookRedirectUrl = () => {
  return process.env.HOSTED_URL
    ? `https://${process.env.HOSTED_URL}/api/outlook/auth/authorize`
    : "http://localhost:3000/api/outlook/auth/authorize";
};

export const getGoogleRedirectUri = (clientId: string, redirectUrl: string) => {
  return (
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    `client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
    `&scope=https://www.googleapis.com/auth/calendar` +
    `&response_type=code` +
    `&access_type=offline`
  );
};

export const getGoogleRedirectUrl = () => {
  return process.env.HOSTED_URL
    ? `https://${process.env.HOSTED_URL}/api/google/auth/authorize`
    : "http://localhost:3000/api/google/auth/authorize";
};
