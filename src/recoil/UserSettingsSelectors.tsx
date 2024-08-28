import { applyTheme } from "@/helpers/settingsHelpers";
import { userSettingState } from "@/recoil/UserSettingsAtoms";
import {
  Booking,
  FavoriteLink,
  RSSFeed,
  SearchEngineDefault,
  ThemeSettings,
  TileSettings,
  TodoObject,
  UserSettings,
} from "@/types";
import { selector, selectorFamily } from "recoil";

type TilePropertyUpdater<T> = (theme: any, newValue: T) => void;

export const createTilePropertySelector = <T,>(
  key: string,
  propertyUpdater: TilePropertyUpdater<T>
) => {
  return selectorFamily<T, number>({
    key,
    get:
      (tileId) =>
      ({ get }): T => {
        const currentTheme = get(themeSelector) as ThemeSettings;
        return currentTheme.tiles[tileId][key as keyof TileSettings] as T;
      },
    set:
      (tileId) =>
      ({ get, set }, newValue) => {
        const userSettings = JSON.parse(
          JSON.stringify(get(userSettingState))
        ) as UserSettings;

        for (const theme of userSettings.themes) {
          if (!theme.tiles[tileId]) {
            continue;
          }
          propertyUpdater(theme.tiles[tileId], newValue as T);
        }

        set(userSettingState, userSettings);
      },
  });
};

export const redditFeedSelector = createTilePropertySelector<string>(
  "subReddit",
  (theme, newValue) => {
    theme.subReddit = newValue;
  }
);

export const subRedditSortTypeSelector = createTilePropertySelector<string>(
  "subRedditSortType",
  (theme, newValue) => {
    theme.subRedditSortType = newValue;
  }
);

export const hackerNewsFeedSelector = createTilePropertySelector<string>(
  "hackerNewsFeedType",
  (theme, newValue) => {
    theme.hackerNewsFeedType = newValue;
  }
);

export const cityForWeatherSelector = createTilePropertySelector<string>(
  "cityForWeather",
  (theme, newValue) => {
    theme.cityForWeather = newValue;
  }
);

export const tempDisplayInCelsiusSelector = createTilePropertySelector<string>(
  "tempDisplayInCelsius",
  (theme, newValue) => {
    theme.tempDisplayInCelsius = newValue;
  }
);

export const bookingsSelector = createTilePropertySelector<Booking[]>(
  "bookings",
  (theme, newValue) => {
    theme.bookings = newValue;
  }
);

export const stockSelector = createTilePropertySelector<string>(
  "stockName",
  (theme, newValue) => {
    theme.stockName = newValue;
  }
);

export const graphStockSelector = createTilePropertySelector<string>(
  "graphStock",
  (theme, newValue) => {
    theme.graphStock = newValue;
  }
);

export const bonsaiTrunkColorSelector = createTilePropertySelector<string>(
  "bonsaiTrunkColor",
  (theme, newValue) => {
    theme.bonsaiTrunkColor = newValue;
  }
);

export const bonsaiBaseColorSelector = createTilePropertySelector<string>(
  "bonsaiBaseColor",
  (theme, newValue) => {
    theme.bonsaiBaseColor = newValue;
  }
);

export const uvCitySelector = createTilePropertySelector<string>(
  "cityForUv",
  (theme, newValue) => {
    theme.cityForUv = newValue;
  }
);

export const todoListSelector = createTilePropertySelector<TodoObject[]>(
  "todoList",
  (theme, newValue) => {
    theme.todoList = newValue;
  }
);

export const spotifyTopArtistTimeLengthSelector =
  createTilePropertySelector<string>(
    "spotifyArtistSearchTimeLength",
    (theme, newValue) => {
      theme.spotifyArtistSearchTimeLength = newValue;
    }
  );

export const spotifyMediaControlsShowingSelector =
  createTilePropertySelector<boolean>(
    "spotifyMediaControlsShowing",
    (theme, newValue) => {
      theme.spotifyMediaControlsShowing = newValue;
    }
  );

export const markdownFileTextSelector = createTilePropertySelector<string>(
  "markdownFileText",
  (theme, newValue) => {
    theme.markdownFileText = newValue;
  }
);

export const favoriteLinksSelector = createTilePropertySelector<FavoriteLink[]>(
  "favoriteLinks",
  (theme, newValue) => {
    theme.favoriteLinks = newValue;
  }
);

export const favoriteLinksTitleSelector = createTilePropertySelector<string>(
  "favoriteLinksTitle",
  (theme, newValue) => {
    theme.favoriteLinksTitle = newValue;
  }
);

export const rssFeedsSelector = createTilePropertySelector<RSSFeed[]>(
  "rssFeeds",
  (theme, newValue) => {
    theme.rssFeeds = newValue;
  }
);

export const rssFeedTitleSelector = createTilePropertySelector<string>(
  "rssFeedTitle",
  (theme, newValue) => {
    theme.rssFeedTitle = newValue;
  }
);

export const timeTileShowingSecondsSelector =
  createTilePropertySelector<boolean>(
    "timeTileShowingSeconds",
    (theme, newValue) => {
      theme.timeTileShowingSeconds = newValue;
    }
  );

export const timeTileShowingTimerSelector = createTilePropertySelector<boolean>(
  "timeTileShowingTimer",
  (theme, newValue) => {
    theme.timeTileShowingTimer = newValue;
  }
);

export const timeTileShowing12HourSelector =
  createTilePropertySelector<boolean>(
    "timeTileShowing12Hour",
    (theme, newValue) => {
      theme.timeTileShowing12Hour = newValue;
    }
  );

export const subRedditOffsetSelector = createTilePropertySelector<number>(
  "subRedditOffset",
  (theme, newValue) => {
    theme.subRedditOffset = newValue;
  }
);

export const spotifyControllingBackgroundSelector =
  createTilePropertySelector<boolean>(
    "spotifyControllingBackground",
    (theme, newValue) => {
      theme.spotifyControllingBackground = newValue;
    }
  );

export const defaultSearchEngineSelector =
  createTilePropertySelector<SearchEngineDefault>(
    "defaultSearchEngine",
    (theme, newValue) => {
      theme.defaultSearchEngine = newValue;
    }
  );

export const imageUrlPathSelector = createTilePropertySelector<string>(
  "imageUrlPath",
  (theme, newValue) => {
    theme.imageUrlPath = newValue;
  }
);

export const imageFilePathSelector = createTilePropertySelector<string>(
  "imageFilePath",
  (theme, newValue) => {
    theme.imageFilePath = newValue;
  }
);

export const backgroundEffectsOptionsSelector =
  createTilePropertySelector<string>(
    "backgroundEffectsOptions",
    (theme, newValue) => {
      theme.backgroundEffectsOptions = newValue;
    }
  );

export const themeSelector = selector<ThemeSettings>({
  key: "themeSelector",
  get: ({ get }) => {
    const userSettings = get(userSettingState);

    // will only be populated if the user doesn't have userSettings.systemThemeSettings in their storage
    let themeNameFromStorage = "";

    // need to have a check if someone still has legacy settings with no systemThemeSettings object
    if (!userSettings.systemThemeSettings) {
      themeNameFromStorage = window.localStorage
        .getItem("themeName")
        ?.replaceAll('"', "")!;
    }

    return userSettings.themes.find(
      (theme) =>
        theme.themeName ===
        (themeNameFromStorage !== ""
          ? themeNameFromStorage
          : userSettings.systemThemeSettings.currentThemeName)
    )!;
  },
});

export const themeNameSelector = selector<string>({
  key: "themeNameSelector",
  get: ({ get }) => {
    const userSettings = get(userSettingState);

    // will only be populated if the user doesn't have userSettings.systemThemeSettings in their storage
    let themeNameFromStorage;
    if (!userSettings.systemThemeSettings) {
      themeNameFromStorage = window.localStorage
        .getItem("themeName")
        ?.replaceAll('"', "")!;
    }

    return themeNameFromStorage
      ? themeNameFromStorage
      : userSettings.systemThemeSettings.currentThemeName;
  },
  set: ({ get, set }, newThemeName) => {
    const userSettings = get(userSettingState);

    // Update the themeName with the new value
    const updatedSystemThemeSettings = {
      ...userSettings.systemThemeSettings,
      currentThemeName: newThemeName,
    };

    const updatedSettings = {
      ...userSettings,
      systemThemeSettings: updatedSystemThemeSettings,
    } as UserSettings;

    applyTheme(
      updatedSettings.themes.find((theme) => theme.themeName === newThemeName)!
    );

    set(userSettingState, updatedSettings);
  },
});
