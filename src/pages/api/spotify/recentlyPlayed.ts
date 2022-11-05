import { NextApiRequest, NextApiResponse } from "next";

const ENCRYPT_KEY = process.env.TOKEN_ENCRYPT_KEY;

const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ success: false });
  }

  let accessToken = req.cookies["spotifyAccessToken"];
  let refreshToken = req.cookies["spotifyRefreshToken"];
  if (!accessToken || !refreshToken) {
    return res.status(400).send("Failed to provide access or refresh token");
  }

  if (!ENCRYPT_KEY) {
    return res
      .status(500)
      .send("No encryption key found in environment variables");
  }

  const CryptoJS = (await import("crypto-js")).default;

  accessToken = CryptoJS.AES.decrypt(accessToken, ENCRYPT_KEY).toString(
    CryptoJS.enc.Utf8
  );
  refreshToken = CryptoJS.AES.decrypt(refreshToken, ENCRYPT_KEY).toString(
    CryptoJS.enc.Utf8
  );

  try {
    const recentlyPlayedRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // access token is out of data, the client should refresh itself
    if (recentlyPlayedRes.status === 401) {
      return res.status(401).send("Auth token has expired");
    }

    if (recentlyPlayedRes.status >= 400) {
      return res
        .status(recentlyPlayedRes.status)
        .json("There was an error fetching the recently played song");
    }

    const data = await recentlyPlayedRes.json();

    // if a podcast has been played
    if (data.items[0].track.type === "episode") {
      return res.status(200).json({
        playing: false,
        songTitle: data.items[1].track.name,
        songArtist: data.items[1].track.artists[0].name,
        link: data.items[1].track.external_urls.spotify,
        albumFullSizeImageUrl: data.items[1].track.album.images[0].url,
        albumPreviewUrl: data.items[1].track.album.images[2].url,
        playable: false,
      });
    } else {
      // if a song has been played
      return res.status(200).json({
        playing: false,
        songTitle: data.items[0].track.name,
        songArtist: data.items[0].track.artists[0].name,
        link: data.items[0].track.external_urls.spotify,
        albumFullSizeImageUrl: data.items[0].track.album.images[0].url,
        albumPreviewUrl: data.items[0].track.album.images[2].url,
        playable: false,
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}
