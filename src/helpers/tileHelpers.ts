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

export const calculateTimeAgoString = (date: Date) => {
  const timeDiff = new Date().getTime() - new Date(date).getTime();

  if (timeDiff < 3600000) {
    return `${Math.floor(timeDiff / 60000)} minutes ago`;
  } else if (timeDiff < 86400000) {
    return `${Math.floor(timeDiff / 3600000)} hours ago`;
  } else {
    return `${Math.ceil(timeDiff / (1000 * 60 * 60 * 24))} days ago`;
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
