# [Starter Tab](https://startertab.com/)
## A fork of the orginal startertab that adds docker support.
What is added:
- bun.sh support (builds under a minute on an base m1 running a docker vm)
- docker support (around ~260 mb images)
Note that caching isn't implemented as the build sizes balloon (~1 gb) and it builds fast anyways : P
- removed analytics
what does not work:
- public themes (could be fixed if allister sets cors to public on the api / if you setup your own db).
- maybe some stuff I dont use (open an issue !)
remember to set the enviorment variables in .env.local first.  

The orginal readme follows:

https://github.com/allister-grange/startertab/assets/18430086/e8173522-c566-4cec-a894-061925c8c4ff

I was getting sick of the same old new tab page. I wanted to have a dashboard for everything I reach for in my typical workday, so I built it. 

StarterTab is here to revolutionize the way you start your day on the internet. With a completely customizable webapp to replace your new tab homepage, you can personalize your online experience like never before.

You can install the [chrome extension here](https://chrome.google.com/webstore/detail/custom-new-tab-url/mmjbdbjnoablegbkcklggeknkfcjkjia?hl=en), or the [firefox extension here](https://addons.mozilla.org/en-US/firefox/addon/startertab-your-next-new-tab/) and make StarterTab the site that opens up on every one of your new tabs.

## Tech

Local storage is being used for storing all of your customizations, meaning you own your data! All of the settings, tokens and themes sit on your own browser. Some may call it laziness that I don't want to maintain a database, you could also see it as me helping prevent your data being in yet another cloud service.

Written in NextJS with CharkaUI. Hosted on Vercel.

## Current API Integrations

- [Strava API](https://developers.strava.com/docs/reference/) for my swims/runs for the week
- [Spotify API](https://developer.spotify.com/documentation/web-api/) for Spotify controls and your favorite artists
- [Weather API](https://www.weatherapi.com/) for the weather data for my city
- [Hacker News](https://hackernews.api-docs.io/) for the top ask posts for the day
- [Stocks API](https://finnhub.io/docs/api) for the stick ticker info
- [Twitter API](https://developer.twitter.com/en/docs/twitter-api) for your feed
- [Google Calendar API](https://developers.google.com/calendar/api/guides/overview) for your Google Calendar
- [Microsoft Outlook Calendar API](https://learn.microsoft.com/en-us/graph/outlook-calendar-concept-overview) for your Outlook calendar

## Future API Integrations Ideas

- Public transport provider

## Getting Started

### 1. Clone the repository and install dependencies

```
git clone https://github.com/allister-grange/startertab.git
cd startertab
yarn install
```

### 2. Configure your local environment

Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```
cp .env.local.example .env.local
```

Add details for all providers you want to use:

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
OUTLOOK_CLIENT_ID=<YOUR_SECRET_HERE>
OUTLOOK_CLIENT_SECRET=<YOUR_SECRET_HERE>
GOOGLE_CLIENT_ID=<YOUR_SECRET_HERE>
GOOGLE_CLIENT_SECRET=<YOUR_SECRET_HERE>
```

### 3. Start the application

To run your startertab locally, use:

```
yarn dev
```

To run it in production mode, use:

```
yarn build && yarn start
```

## Adding in a New Tile

1. Create your new Tile component in the `src/components/tiles` folder. Make sure to accept a 'tileId' prop, this enables you to change the color of the text based off the settings changed in the sidebar.

```js
type PageProps = {
  tileId: TileId;
};

export const YourNewTile: React.FC<PageProps> = ({ tileId }) => {
    const color = `var(--text-color-${tileId})`;

  return ();
}
```

2. Add your tile type to the TileType in `src/types/settings.ts`.
3. Add your new tile into the corresponding sizes you want available for your tile in the switch statement for `tileSize` in `src/components/sidebar/TypePicker.tsx`
4. Add your tile type to the switch statement for the `tileType` in `src/components/TileContainer.tsx`
5. If you want to add in persistent storage to the tile, use Recoil. Look at how another tile uses a FamilySelector and the useRecoilState hook
