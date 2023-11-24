import { UserSettings } from "@/types";
import {
  defaultGridLayout,
  eightTileGridLayout,
  sixTileGridLayout,
  twoTileGridLayout,
} from "./gridLayout";

export const defaultSettings: UserSettings = {
  systemThemeSettings: {
    usingSystemTheme: false,
    lightTheme: "",
    darkTheme: "",
  },
  themes: [
    {
      themeName: "Colored Light",
      downloadedFromMarketplace: false,
      globalSettings: {
        tileId: -1,
        tileSize: "medium",
        backgroundColor: "#ffffff",
        textColor: "#222222",
        tileType: "None",
        subTextColor: "#333333",
        sidebarBackgroundColor: "#eeeeee",
        themePickerBubbleColor:
          "linear-gradient(90deg, white 50%, #E89B4B 50%);",
        borderRadius: "15px",
        gridGap: "16px",
      },
      tileLayout: defaultGridLayout,
      tiles: [
        {
          tileId: 0,
          backgroundColor: "#65abc1",
          textColor: "#ffffff",
          tileType: "Hacker News Feed",
          hackerNewsFeedType: "Top",
          tileSize: "medium",
        },
        {
          tileId: 1,
          backgroundColor: "#E89C4B",
          textColor: "#ffffff",
          tileType: "Large Weather Tile",
          tileSize: "large",
        },
        {
          tileId: 2,
          backgroundColor: "#9AB899",
          textColor: "#ffffff",
          tileType: "Todo List",
          tileSize: "medium",
        },
        {
          tileId: 3,
          backgroundColor: "#65abc1",
          textColor: "#ffffff",
          tileType: "Reddit Feed",
          tileSize: "medium",
        },
        {
          tileId: 4,
          backgroundColor: "#F06808",
          textColor: "#ffffff",
          tileType: "Search Bar",
          tileSize: "long",
        },
        {
          tileId: 5,
          backgroundColor: "#E89C4B",
          textColor: "#ffffff",
          tileType: "Bonsai",
          bonsaiTrunkColor: "#fff",
          bonsaiBaseColor: "#000",
          tileSize: "medium",
        },
        {
          tileId: 6,
          backgroundColor: "#E89C4B",
          textColor: "#ffffff",
          tileType: "Small Stock Tile",
          tileSize: "small",
        },
        {
          tileId: 7,
          backgroundColor: "#65abc1",
          textColor: "#ffffff",
          tileType: "Small Stock Tile",
          tileSize: "small",
        },
        {
          tileId: 8,
          backgroundColor: "#9AB899",
          textColor: "#ffffff",
          tileType: "Large Spotify Tile",
          tileSize: "large",
        },
        {
          tileId: 9,
          backgroundColor: "#E89C4B",
          textColor: "#ffffff",
          tileType: "Time",
          tileSize: "small",
        },
        {
          tileId: 10,
          backgroundColor: "#65abc1",
          textColor: "#ffffff",
          tileType: "Theme Picker",
          tileSize: "small",
        },
      ],
    },
    {
      themeName: "Colored Dark",
      downloadedFromMarketplace: false,
      tileLayout: defaultGridLayout,
      globalSettings: {
        tileId: -1,
        tileSize: "medium",
        backgroundColor: "#1B202B",
        textColor: "#fff",
        subTextColor: "#ddd",
        tileType: "None",
        sidebarBackgroundColor: "#33393D",
        sidebarBorderColor: "#666",
        themePickerBubbleColor:
          "linear-gradient(90deg, black 50%, #E89B4B 50%);",
        borderRadius: "15px",
        gridGap: "16px",
      },
      tiles: [
        {
          tileId: 0,
          backgroundColor: "#65abc1",
          textColor: "#222222",
          tileType: "Hacker News Feed",
          hackerNewsFeedType: "Top",
          tileSize: "medium",
        },
        {
          tileId: 1,
          backgroundColor: "#E89C4B",
          textColor: "#222222",
          tileType: "Large Weather Tile",
          tileSize: "large",
        },
        {
          tileId: 2,
          backgroundColor: "#9AB899",
          textColor: "#222222",
          tileType: "Todo List",
          tileSize: "medium",
        },
        {
          tileId: 3,
          backgroundColor: "#E89C4B",
          textColor: "#222222",
          tileType: "Reddit Feed",
          tileSize: "medium",
        },
        {
          tileId: 4,
          backgroundColor: "#F06808",
          textColor: "#222222",
          tileType: "Day Planner",
          tileSize: "long",
        },
        {
          tileId: 5,
          backgroundColor: "#E89C4B",
          textColor: "#222222",
          tileType: "Bonsai",
          bonsaiTrunkColor: "#fff",
          bonsaiBaseColor: "#000",
          tileSize: "medium",
        },
        {
          tileId: 6,
          backgroundColor: "#65abc1",
          textColor: "#222222",
          tileType: "Small Stock Tile",
          tileSize: "small",
        },
        {
          tileId: 7,
          backgroundColor: "#9AB899",
          textColor: "#222222",
          tileType: "Small Stock Tile",
          tileSize: "small",
        },
        {
          tileId: 8,
          backgroundColor: "#E89C4B",
          textColor: "#222222",
          tileType: "Large Spotify Tile",
          tileSize: "large",
        },
        {
          tileId: 9,
          backgroundColor: "#9AB899",
          textColor: "#222222",
          tileType: "Time",
          tileSize: "small",
        },
        {
          tileId: 10,
          backgroundColor: "#65abc1",
          textColor: "#222222",
          tileType: "Theme Picker",
          tileSize: "small",
        },
      ],
    },
    {
      themeName: "Wavy",
      downloadedFromMarketplace: false,
      globalSettings: {
        tileId: -1,
        tileSize: "medium",
        backgroundColor: "url(/wavy.jpeg)",
        textColor: "#222222",
        tileType: "None",
        subTextColor: "#333333",
        dropShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        sidebarBackgroundColor: "#eeeeee",
        themePickerBubbleColor: "linear-gradient(360deg, blue 50%, white 50%);",
        borderRadius: "15px",
        gridGap: "16px",
      },
      tileLayout: sixTileGridLayout,
      tiles: [
        {
          tileId: 0,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          textColor: "#222222",
          tileType: "Large Weather Tile",
          tileSize: "large",
          cityForWeather: "",
        },
        {
          tileId: 1,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          textColor: "#222222",
          tileType: "Todo List",
          tileSize: "medium",
          todoList: [
            {
              date: 0,
              done: false,
              title: "Add some todos ✔️",
            },
          ],
        },
        {
          tileId: 2,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          textColor: "#222222",
          tileType: "Day Planner",
          tileSize: "long",
        },
        {
          tileId: 3,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          textColor: "#222222",
          tileType: "Small Stock Tile",
          tileSize: "small",
          stockName: "",
        },
        {
          tileId: 4,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          textColor: "#222222",
          tileType: "Small Stock Tile",
          tileSize: "small",
          stockName: "",
        },
        {
          tileId: 5,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          textColor: "#222222",
          tileType: "Large Spotify Tile",
          tileSize: "large",
        },
      ],
    },
    {
      themeName: "Pink",
      downloadedFromMarketplace: false,
      globalSettings: {
        tileId: -1,
        tileSize: "medium",
        backgroundColor:
          "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
        textColor: "#222222",
        tileType: "None",
        subTextColor: "#333333",
        dropShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        sidebarBackgroundColor: "#eeeeee",
        themePickerBubbleColor:
          "linear-gradient(90deg, #ABA1EE 50%, #f882ff 50%);",
        borderRadius: "15px",
        gridGap: "16px",
      },
      tileLayout: sixTileGridLayout,
      tiles: [
        {
          tileId: 0,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          textColor: "#222222",
          tileType: "Large Weather Tile",
          tileSize: "large",
          cityForWeather: "",
        },
        {
          tileId: 1,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          textColor: "#222222",
          tileType: "Todo List",
          tileSize: "medium",
          todoList: [
            {
              date: 0,
              done: false,
              title: "Add some todos ✔️",
            },
          ],
        },
        {
          tileId: 2,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          textColor: "#222222",
          tileType: "Day Planner",
          tileSize: "long",
        },
        {
          tileId: 3,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          textColor: "#222222",
          tileType: "Small Stock Tile",
          tileSize: "small",
          stockName: "",
        },
        {
          tileId: 4,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          textColor: "#222222",
          tileType: "Small Stock Tile",
          tileSize: "small",
          stockName: "",
        },
        {
          tileId: 5,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          textColor: "#222222",
          tileType: "Large Spotify Tile",
          tileSize: "large",
        },
      ],
    },
    {
      themeName: "Basic Light",
      downloadedFromMarketplace: false,
      globalSettings: {
        tileId: -1,
        tileSize: "medium",
        backgroundColor: "#F3F4F6",
        textColor: "#222222",
        tileType: "None",
        subTextColor: "#333333",
        dropShadow: "",
        sidebarBackgroundColor: "#eeeeee",
        themePickerBubbleColor: "white",
        borderRadius: "15px",
        gridGap: "16px",
      },
      tileLayout: twoTileGridLayout,
      tiles: [
        {
          tileId: 0,
          backgroundColor: "#ffffff",
          textColor: "#6570b9",
          tileType: "Large Weather Tile",
          tileSize: "large",
        },
        {
          tileId: 1,
          backgroundColor: "#ffffff",
          textColor: "#6570b9",
          tileType: "Reddit Feed",
          tileSize: "medium",
        },
      ],
    },

    {
      themeName: "Metro",
      downloadedFromMarketplace: false,
      globalSettings: {
        tileId: -1,
        tileSize: "medium",
        backgroundColor: "#262641",
        textColor: "#fff",
        subTextColor: "#ddd",
        tileType: "None",
        dropShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        tileBorder: "1px solid rgba(255, 255, 255, 0.3)",
        sidebarBackgroundColor: "#33393D",
        themePickerBubbleColor: "#262641",
        sidebarBorderColor: "#666",
        borderRadius: "15px",
        gridGap: "16px",
      },
      tileLayout: sixTileGridLayout,
      tiles: [
        {
          tileId: 0,
          backgroundColor: "rgba(255, 255, 255, 0.0)",
          textColor: "#d1f1a9",
          tileType: "Large Weather Tile",
          tileSize: "large",
          cityForWeather: "",
        },
        {
          tileId: 1,
          backgroundColor: "rgba(255, 255, 255, 0.0)",
          textColor: "#99ffff",
          tileType: "Todo List",
          tileSize: "medium",
          todoList: [
            {
              date: 0,
              done: false,
              title: "Add some todos ✔️",
            },
          ],
        },
        {
          tileId: 2,
          backgroundColor: "rgba(255, 255, 255, 0.0)",
          textColor: "#bbdaff",
          tileType: "Day Planner",
          tileSize: "long",
        },
        {
          tileId: 3,
          backgroundColor: "rgba(255, 255, 255, 0.0)",
          textColor: "#ebbbff",
          tileType: "Small Stock Tile",
          tileSize: "small",
          stockName: "",
        },
        {
          tileId: 4,
          backgroundColor: "rgba(255, 255, 255, 0.0)",
          textColor: "#ffeead",
          tileType: "Small Stock Tile",
          tileSize: "small",
          stockName: "",
        },
        {
          tileId: 5,
          backgroundColor: "rgba(255, 255, 255, 0.0)",
          textColor: "#ff9da4",
          tileType: "Large Spotify Tile",
          tileSize: "large",
        },
      ],
    },
    {
      themeName: "Basic Dark",
      downloadedFromMarketplace: false,
      globalSettings: {
        tileId: -1,
        tileSize: "medium",
        backgroundColor: "#000",
        textColor: "#fff",
        subTextColor: "#ddd",
        tileType: "None",
        sidebarBackgroundColor: "#33393D",
        themePickerBubbleColor: "black",
        sidebarBorderColor: "#666",
        dropShadow: "2px 2px 6px rgba(0,0,0,.3)",
        borderRadius: "15px",
        gridGap: "16px",
      },
      tileLayout: twoTileGridLayout,
      tiles: [
        {
          tileId: 0,
          backgroundColor: "#1A1C1D",
          textColor: "#d8d8d8",
          tileType: "Large Spotify Tile",
          tileSize: "large",
        },
        {
          tileId: 1,
          backgroundColor: "#1A1C1D",
          textColor: "#d8d8d8",
          tileType: "Reddit Feed",
          tileSize: "medium",
        },
      ],
    },
    {
      themeName: "Sunrise",
      downloadedFromMarketplace: false,
      globalSettings: {
        tileId: -1,
        tileSize: "medium",
        backgroundColor: "linear-gradient(0deg, #f5f4eb, #bce1f7) fixed",
        textColor: "#222222",
        tileType: "None",
        subTextColor: "#333333",
        dropShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        sidebarBackgroundColor: "#eeeeee",
        themePickerBubbleColor:
          "linear-gradient(360deg, #f5f4eb 50%, #bce1f7 50%);",
        borderRadius: "15px",
        gridGap: "16px",
      },
      tileLayout: sixTileGridLayout,
      tiles: [
        {
          tileId: 0,
          backgroundColor: "rgba(255, 255, 255, 0.0)",
          textColor: "#606060",
          tileType: "Large Weather Tile",
          tileSize: "large",
          cityForWeather: "",
        },
        {
          tileId: 1,
          backgroundColor: "rgba(255, 255, 255, 0.0)",
          textColor: "#606060",
          tileType: "Todo List",
          tileSize: "medium",
          todoList: [
            {
              date: 0,
              done: false,
              title: "Add some todos ✔️",
            },
          ],
        },
        {
          tileId: 2,
          backgroundColor: "rgba(255, 255, 255, 0.0)",
          textColor: "#606060",
          tileType: "Day Planner",
          tileSize: "long",
        },
        {
          tileId: 3,
          backgroundColor: "rgba(255, 255, 255, 0.0)",
          textColor: "#606060",
          tileType: "Small Stock Tile",
          tileSize: "small",
          stockName: "",
        },
        {
          tileId: 4,
          backgroundColor: "rgba(255, 255, 255, 0.0)",
          textColor: "#606060",
          tileType: "Small Stock Tile",
          tileSize: "small",
          stockName: "",
        },
        {
          tileId: 5,
          backgroundColor: "rgba(255, 255, 255, 0.0)",
          textColor: "#606060",
          tileType: "Large Spotify Tile",
          tileSize: "large",
        },
      ],
    },
    {
      themeName: "Grayed Out",
      downloadedFromMarketplace: false,
      tileLayout: eightTileGridLayout,
      globalSettings: {
        tileId: -1,
        tileSize: "medium",
        backgroundColor: "#53606F",
        textColor: "#fff",
        subTextColor: "#ddd",
        tileType: "None",
        sidebarBackgroundColor: "#33393D",
        sidebarBorderColor: "#666",
        dropShadow: "8px 8px 0 rgba(0,0,0,.3)",
        themePickerBubbleColor:
          "linear-gradient(360deg, #53606F 50%, #909090 50%);",
        borderRadius: "15px",
        gridGap: "16px",
      },
      tiles: [
        {
          tileId: 0,
          tileType: "Large Spotify Tile",
          tileSize: "large",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          textColor: "white",
        },
        {
          tileId: 1,
          tileType: "Favorite Links Tile",
          tileSize: "medium",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          textColor: "white",
        },
        {
          tileId: 2,
          tileType: "Small Weather Tile",
          tileSize: "small",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          textColor: "white",
        },
        {
          tileId: 3,
          tileType: "Todo List",
          tileSize: "large",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          textColor: "white",
        },
        {
          tileId: 4,
          tileType: "Small Stock Tile",
          tileSize: "small",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          textColor: "white",
        },
        {
          tileId: 5,
          tileType: "Small Stock Tile",
          tileSize: "small",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          textColor: "white",
        },
        {
          tileId: 6,
          tileType: "Small Stock Tile",
          tileSize: "small",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          textColor: "white",
        },
        {
          tileId: 7,
          tileType: "Time",
          tileSize: "small",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          textColor: "white",
        },
      ],
    },
    {
      themeName: "Pixel Art",
      downloadedFromMarketplace: false,
      globalSettings: {
        tileId: -1,
        tileSize: "medium",
        backgroundColor: "url(https://i.redd.it/glmqqqagx4891.gif)",
        tileType: "None",
        dropShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        tileBorder: "1px solid rgba(255, 255, 255, 0.3)",
        textColor: "#fff",
        subTextColor: "#ddd",
        sidebarBackgroundColor: "#33393D",
        sidebarBorderColor: "#666",
        themePickerBubbleColor: "linear-gradient(90deg, white 50%, black 50%);",
        borderRadius: "15px",
        gridGap: "16px",
      },
      tileLayout: {
        lg: [
          {
            w: 2,
            h: 4,
            x: 0,
            y: 0,
            i: "0",
            minW: 2,
            minH: 4,
            moved: false,
            static: false,
          },
          {
            w: 2,
            h: 4,
            x: 0,
            y: 4,
            i: "1",
            minW: 2,
            minH: 4,
            moved: false,
            static: false,
          },
        ],
        md: [
          {
            w: 2,
            h: 4,
            x: 0,
            y: 0,
            i: "0",
            minW: 2,
            minH: 4,
            moved: false,
            static: false,
          },
          {
            w: 2,
            h: 4,
            x: 0,
            y: 4,
            i: "1",
            minW: 2,
            minH: 4,
            moved: false,
            static: false,
          },
        ],
        sm: [
          {
            w: 2,
            h: 4,
            x: 1,
            y: 7,
            i: "0",
            minH: 4,
            minW: 2,
          },
          {
            w: 2,
            h: 4,
            x: 0,
            y: 8,
            i: "1",
            minH: 4,
            minW: 2,
          },
        ],
        xs: [
          {
            w: 2,
            h: 4,
            x: 1,
            y: 7,
            i: "0",
            minH: 4,
            minW: 2,
          },
          {
            w: 2,
            h: 4,
            x: 0,
            y: 8,
            i: "1",
            minH: 4,
            minW: 2,
          },
        ],
      },
      tiles: [
        {
          tileId: 0,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          textColor: "white",
          tileType: "Large Spotify Tile",
          tileSize: "large",
        },
        {
          tileId: 1,
          tileType: "Google Meetings Tile",
          textColor: "white",
          tileSize: "large",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
        },
      ],
    },
  ],
};
