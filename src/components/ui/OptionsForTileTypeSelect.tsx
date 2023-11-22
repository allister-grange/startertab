import { optionsStyles } from "@/helpers/selectOptionStyles";
import { TileSize } from "@/types";
import React from "react";

interface OptionsForTileTypeSelectProps {
  tileSize: TileSize;
}

export const OptionsForTileTypeSelect: React.FC<
  OptionsForTileTypeSelectProps
> = ({ tileSize }) => {
  let options;

  switch (tileSize) {
    case "small":
      options = (
        <>
          <option style={optionsStyles} value="Blank Tile">
            Blank
          </option>
          <option style={optionsStyles} value="Favorite Links Tile">
            Favorite Links
          </option>
          <option style={optionsStyles} value="Small Spotify Tile">
            Spotify
          </option>
          <option style={optionsStyles} value="Small Stock Tile">
            Stock Ticker
          </option>
          <option style={optionsStyles} value="Theme Picker">
            Theme Picker
          </option>
          <option style={optionsStyles} value="Time">
            Time
          </option>
          <option style={optionsStyles} value="Small Weather Tile">
            Weather
          </option>
        </>
      );
      break;
    case "medium":
      options = (
        <>
          <option style={optionsStyles} value="Blank Tile">
            Blank
          </option>
          <option style={optionsStyles} value="Bonsai">
            Bonsai
          </option>
          <option style={optionsStyles} value="Favorite Links Tile">
            Favorite Links
          </option>
          <option style={optionsStyles} value="Google Meetings Tile">
            Google Meetings Tile
          </option>
          <option style={optionsStyles} value="Hacker News Feed">
            Hacker News Feed
          </option>
          <option style={optionsStyles} value="Markdown File Tile">
            Markdown File
          </option>
          <option style={optionsStyles} value="Outlook Meetings Tile">
            Outlook Meetings Tile
          </option>
          <option style={optionsStyles} value="Reddit Feed">
            Reddit Feed
          </option>
          <option style={optionsStyles} value="RSS Feed Tile">
            RSS Feed
          </option>
          <option style={optionsStyles} value="Spotify Top Artist Tile">
            Spotify Top Artist List
          </option>
          <option style={optionsStyles} value="Todo List">
            Todo List
          </option>
          <option style={optionsStyles} value="Twitter Feed Tile">
            Twitter Feed
          </option>
        </>
      );
      break;
    case "large":
      options = (
        <>
          <option style={optionsStyles} value="Blank Tile">
            Blank
          </option>
          <option style={optionsStyles} value="Bonsai">
            Bonsai
          </option>
          {/* <option style={optionsStyles} value="Javascript Console Tile">
            Javascript Console Tile
          </option> */}
          <option style={optionsStyles} value="Favorite Links Tile">
            Favorite Links
          </option>
          <option style={optionsStyles} value="Google Meetings Tile">
            Google Meetings Tile
          </option>
          <option style={optionsStyles} value="Hacker News Feed">
            Hacker News Feed
          </option>
          <option style={optionsStyles} value="Markdown File Tile">
            Markdown File
          </option>
          <option style={optionsStyles} value="Outlook Meetings Tile">
            Outlook Meetings Tile
          </option>
          <option style={optionsStyles} value="Reddit Feed">
            Reddit Feed
          </option>
          <option style={optionsStyles} value="RSS Feed Tile">
            RSS Feed
          </option>
          <option style={optionsStyles} value="Large Spotify Tile">
            Spotify Tile
          </option>
          <option style={optionsStyles} value="Large Stock Tile">
            Stock Tile
          </option>
          <option style={optionsStyles} value="Strava Graph">
            Strava Graph
          </option>
          <option style={optionsStyles} value="Stock Graph Tile">
            Stock Graph
          </option>
          <option style={optionsStyles} value="Todo List">
            Todo List
          </option>
          <option style={optionsStyles} value="Twitter Feed Tile">
            Twitter Feed
          </option>
          <option style={optionsStyles} value="UV Graph">
            UV Graph
          </option>
          <option style={optionsStyles} value="Large Weather Tile">
            Weather Forecast
          </option>
        </>
      );
      break;
    case "long":
      options = (
        <>
          <option style={optionsStyles} value="Blank Tile">
            Blank
          </option>
          <option style={optionsStyles} value="Search Bar">
            Search Bar
          </option>
          <option style={optionsStyles} value="Day Planner">
            Day Planner
          </option>
        </>
      );
      break;
    default:
      options = null;
  }

  return options;
};
