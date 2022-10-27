# [Starter Tab](https://startertab.com/)

https://user-images.githubusercontent.com/18430086/193997502-8d9c7c75-e5d8-467f-b378-36328854f0c9.mp4

## Inspiration

Do you want to have a dashboard with all of the information (addictions) you'd want to see handy in one spot on every new tab? I do, so I am building it!

I use [this](https://chrome.google.com/webstore/detail/custom-new-tab-url/mmjbdbjnoablegbkcklggeknkfcjkjia?hl=en) extension to make the Starter Tab app open up on every new tab of mine.

## Tech

Local storage is used for storing your information, meaning you own your data! All of the settings, tokens and themes sit on your own browser. Some may call it laziness that I don't want to maintain a database, you could also see it as me helping prevent your data being in yet another cloud service. 

Written in NextJS with CharkaUI. Hosted in Vercel.

## Current API Integrations

- [Strava API](https://developers.strava.com/docs/reference/) for my swims/runs for the week
- [Spotify API](https://developer.spotify.com/documentation/web-api/) for Spotify controls and your favorite artists
- [Weather API](https://www.weatherapi.com/) for the weather data for my city
- [Hacker News](https://hackernews.api-docs.io/) for the top ask posts for the day
- [Stocks API](https://finnhub.io/docs/api) for the stick ticker info
- [Twitter API](https://developer.twitter.com/en/docs/twitter-api) for your feed

## Future API Integrations

- Outlook / Microsoft
- Gmail
- Public transport provider

## Local Hosting

Fork the repo, clone it down and create a .env.local file in the root directory and populate the following keys:

.env.local
```
STRAVA_CLIENT_ID=<YOUR_SECRET_HERE>
STRAVA_SECRET=<YOUR_SECRET_HERE>
WEATHERAPI_TOKEN=<YOUR_SECRET_HERE>
SPOTIFY_CLIENT_ID=<YOUR_SECRET_HERE>
SPOTIFY_CLIENT_SECRET=<YOUR_SECRET_HERE>
FINNHUB_SECRET=<YOUR_SECRET_HERE>
TWITTER_CLIENT_ID=<YOUR_SECRET_HERE>
TWITTER_CLIENT_SECRET=<YOUR_SECRET_HERE>
TWITTER_CODE_CHALLENGE_KEY=<YOUR_SECRET_HERE>
TOKEN_ENCRYPT_KEY=<YOUR_SECRET_HERE>
```

Spin her up and you're good to go!

```
yarn install && yarn dev
```

## Adding in a New Tile

1) Create your new Tile component in the ```src/components/tiles``` folder. Make sure to accept a 'tileId' prop, this enables you to change the color of the text based off the settings changed in the sidebar.

```js
type PageProps = {
  tileId: TileId;
};

export const YourNewTile: React.FC<PageProps> = ({ tileId }) => {
    const color = `var(--text-color-${tileId})`;

  return ();
}
```

1) Add your tile type to the TileType in ```src/types/settings.ts```.
2) Add your new option into the corresponding size in the switch statement for ```sizeOfTileForTypes``` in ```src/components/sidebar/TypePicker.tsx```
3) Add your tile type to the switch statement for the ```tileType``` in ```src/components/TileContainer.tsx```
4) If you want to add in persistent storage to the tile, use Recoil. Look at how another tile uses a FamilySelector and the useRecoilState hook
