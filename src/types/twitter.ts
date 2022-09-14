export type TwitterContextInterface = {
  isAuthenticated?: boolean;
  loginWithTwitter: () => void;
  twitterData: Tweet[];
};

export interface TwitterFeedResponse {
  data: Tweet[];
  includes: Includes;
  meta: Meta;
}

export interface Tweet {
  created_at: Date;
  text: string;
  author_id: string;
  id: string;
  author: string;
}

export interface Includes {
  users: User[];
}

export interface User {
  created_at: Date;
  name: string;
  username: string;
  id: string;
}

export interface Meta {
  result_count: number;
  newest_id: string;
  oldest_id: string;
  next_token: string;
}
