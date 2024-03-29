export type GoogleContextInterface = {
  isAuthenticated?: boolean;
  loginWithGoogle: () => void;
  googleData: GoogleMeetingEvent[];
  isLoading: boolean;
  error: unknown;
};

export type GoogleMeetingEvent = {
  summary: string;
  id: string;
  start: {
    dateTime: string;
    timeZone: string;
    date?: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
    date?: string;
  };
  organizer: {
    email: string;
    self: boolean;
  };
  htmlLink: string;
};

export type GoogleMeetingResponse = {
  items: GoogleMeetingEvent[];
};
