import { Booking, SearchEngineDefault } from "@/types";

export const times = [
  "06:00",
  "06:15",
  "06:30",
  "06:45",
  "07:00",
  "07:15",
  "07:30",
  "07:45",
  "08:00",
  "08:15",
  "08:30",
  "08:45",
  "09:00",
  "09:15",
  "09:30",
  "09:45",
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
  "13:45",
  "14:00",
  "14:15",
  "14:30",
  "14:45",
  "15:00",
  "15:15",
  "15:30",
  "15:45",
  "16:00",
  "16:15",
  "16:30",
  "16:45",
  "17:00",
  "17:15",
  "17:30",
  "17:45",
  "18:00",
  "18:15",
  "18:30",
  "18:45",
  "19:00",
  "19:15",
  "19:30",
  "19:45",
  "20:00",
  "20:15",
  "20:30",
  "20:45",
  "21:00",
];

export const defaultDayPlannerFormValues: Booking = {
  color: "#ffb6b6",
  title: "",
  startTime: "06:00",
  endTime: "07:00",
  creationDate: new Date(),
  permanentBooking: false,
};

export const calculateTimeAgoString = (date: Date) => {
  const timeDiff = new Date().getTime() - new Date(date).getTime();

  if (timeDiff < 3600000) {
    const minutes = Math.floor(timeDiff / 60000);
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else if (timeDiff < 86400000) {
    const hours = Math.floor(timeDiff / 3600000);
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else {
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return days === 1 ? "1 day ago" : `${days} days ago`;
  }
};

export const truncateString = (text: string, length: number) => {
  if (text.length > length) {
    // strip last " " if there is one
    if (text[text.length - 1] === " ") {
      return text.substring(0, length - 1) + "...";
    } else {
      return text.substring(0, length - 1) + "...";
    }
  } else {
    return text;
  }
};

export function deepClone<T>(value: T) {
  return JSON.parse(JSON.stringify(value)) as T;
}

export const saveThemeIdToLocalStorage = (themeId: number) => {
  const idsSaved = localStorage.getItem("themesSaved");

  if (!idsSaved) {
    localStorage.setItem("themesSaved", themeId.toString());
  } else {
    localStorage.setItem("themesSaved", `${idsSaved},${themeId}`);
  }
};

export const getThemeIdsFromLocalStorage = () => {
  const idsSaved = localStorage.getItem("themesSaved");

  if (typeof idsSaved === "string") {
    return idsSaved.split(",");
  } else {
    return [];
  }
};

export const getRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

/** used for the list of options you see when changing the default
 * search engine
 *  */
export const searchEngineOptions: SearchEngineDefault[] = [
  {
    name: "Bing (are you ok?)",
    url: "https://www.bing.com/search?q=",
  },
  {
    name: "DuckDuckGo",
    url: "https://duckduckgo.com/?q=",
  },
  {
    name: "Google",
    url: "https://google.com/search?q=",
  },
  {
    name: "Qwant",
    url: "https://www.qwant.com/?t=web&q=",
  },
  {
    name: "StackOverFlow",
    url: "https://google.com/search?q=site%3Astackoverflow.com+",
  },
  {
    name: "StartPage",
    url: "https://www.startpage.com/sp/search?query=",
  },
];
