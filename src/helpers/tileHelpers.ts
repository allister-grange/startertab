import {
  Booking,
  GoogleMeetingEvent,
  OutlookMeetingEvent,
  SearchEngineDefault,
} from "@/types";

const neonColors: string[] = [
  "#39FF14",
  "#FF073A",
  "#FFD700",
  "#00FFFF",
  "#FF00FF",
  "#FF69B4",
  "#FF1493",
  "#7FFF00",
  "#40E0D0",
];

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

const getRandomNeonColor = (): string => {
  const randomIndex = Math.floor(Math.random() * neonColors.length);
  return neonColors[randomIndex];
};

export const convertGoogleBookingsToDayPlanner = (
  googleData: GoogleMeetingEvent[]
) => {
  return googleData.map((event) => ({
    color: getRandomNeonColor(),
    startTime: convertToLocalTime(event.start.dateTime),
    endTime: convertToLocalTime(event.end.dateTime),
    title: event.summary,
    creationDate: new Date(),
    permanentBooking: false,
    duration: calculateDurationOfBooking(
      convertToLocalTime(event.start.dateTime),
      convertToLocalTime(event.end.dateTime)
    ),
  })) as Booking[];
};
export const convertOutlookBookingsToDayPlanner = (
  outlookData: OutlookMeetingEvent[]
) => {
  return outlookData.map((event) => ({
    color: getRandomNeonColor(),
    startTime: convertToLocalTime(event.start.dateTime + "Z"),
    endTime: convertToLocalTime(event.end.dateTime + "Z"),
    title: event.subject,
    creationDate: new Date(),
    permanentBooking: false,
    duration: calculateDurationOfBooking(
      convertToLocalTime(event.start.dateTime),
      convertToLocalTime(event.end.dateTime)
    ),
  })) as Booking[];
};

// Helper function to convert 'HH:MM' time format to total minutes since midnight
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// Helper function to convert minutes since midnight back to 'HH:MM' format
const minutesToTime = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
};

export const mergeBookingsForDayPlanner = (
  googleBookings: Booking[],
  outlookBookings: Booking[],
  bookings?: Booking[]
): Booking[] => {
  if (!bookings) {
    bookings = [];
  }

  const isOverlapping = (booking1: Booking, booking2: Booking): boolean => {
    return (
      timeToMinutes(booking1.startTime) < timeToMinutes(booking2.endTime) &&
      timeToMinutes(booking2.startTime) < timeToMinutes(booking1.endTime)
    );
  };

  const mergeTitles = (
    title1: string,
    source1: string,
    title2: string,
    source2: string
  ): string => {
    return `${title1} (${source1}) <br /> ${title2} (${source2})`;
  };

  const mergedBookings: Booking[] = [];

  // Function to merge two bookings, adjusting times and merging titles
  const mergeBookingEntries = (
    booking1: Booking,
    booking2: Booking,
    source1: string,
    source2: string
  ): Booking => {
    const mergedStartTime = Math.min(
      timeToMinutes(booking1.startTime),
      timeToMinutes(booking2.startTime)
    );
    const mergedEndTime = Math.max(
      timeToMinutes(booking1.endTime),
      timeToMinutes(booking2.endTime)
    );

    return {
      ...booking1,
      startTime: minutesToTime(mergedStartTime),
      endTime: minutesToTime(mergedEndTime),
      title: mergeTitles(booking1.title, source1, booking2.title, source2),
      duration: mergedEndTime - mergedStartTime, // Duration in minutes
    };
  };

  // Merge a set of bookings into mergedBookings array
  const processAndMergeBookings = (
    sourceBookings: Booking[],
    sourceName: string
  ) => {
    sourceBookings.forEach((newBooking) => {
      let merged = false;

      // Check for overlap with existing merged bookings
      mergedBookings.forEach((mergedBooking, index) => {
        if (isOverlapping(mergedBooking, newBooking)) {
          // Merge with the existing merged booking
          mergedBookings[index] = mergeBookingEntries(
            mergedBooking,
            newBooking,
            "merged",
            sourceName
          );
          merged = true;
        }
      });

      // If no overlap was found, add the new booking as is
      if (!merged) {
        mergedBookings.push({
          ...newBooking,
          title: `${newBooking.title} (${sourceName})`, // Append the source to title
        });
      }
    });
  };

  // Process and merge bookings from all three sources
  processAndMergeBookings(bookings, "startertab");
  processAndMergeBookings(googleBookings, "google");
  processAndMergeBookings(outlookBookings, "outlook");

  return mergedBookings;
};

const convertToLocalTime = (dateTime: string): string => {
  const eventDate = new Date(dateTime);

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // User's local time zone
  };

  return eventDate.toLocaleTimeString("en-US", options);
};

export const calculateDurationOfBooking = (
  startTime: string,
  endTime: string
) => {
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  const startDate = new Date();
  startDate.setHours(startHours, startMinutes, 0, 0);

  const endDate = new Date();
  endDate.setHours(endHours, endMinutes, 0, 0);

  const diffMs: number = endDate.getTime() - startDate.getTime();
  const diffMinutes: number = diffMs / (1000 * 60);

  return diffMinutes;
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
