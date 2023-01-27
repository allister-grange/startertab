export type OutlookContextInterface = {
  isAuthenticated?: boolean;
  loginWithOutlook: () => void;
  outlookData: OutlookMeetingEvent[];
  isLoading: boolean;
  error: unknown;
};

export type OutlookMeetingEvent = {
  id: string;
  subject: string;
  webLink: string;
  organizer: {
    emailAddress: {
      name: string;
      address: string;
    };
  };
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  location: {
    displayName: string;
  };
};

export type OutlookMeetingResponse = {
  value: OutlookMeetingEvent[];
};
