export interface StravaActivity {
  resource_state: number;
  athlete: Athlete;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  workout_type: number;
  id: number;
  external_id: any;
  upload_id: any;
  start_date: string;
  start_date_local: string;
  timezone: string;
  utc_offset: number;
  start_latlng: any[];
  end_latlng: any[];
  location_city: any;
  location_state: any;
  location_country: string;
  start_latitude: any;
  start_longitude: any;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map: Map;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  visibility: string;
  flagged: boolean;
  gear_id: string;
  from_accepted_tag: any;
  average_speed: number;
  max_speed: number;
  has_heartrate: boolean;
  heartrate_opt_out: boolean;
  display_hide_heartrate_option: boolean;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
}

export interface Athlete {
  id: number;
  resource_state: number;
}

export interface Map {
  id: string;
  summary_polyline: any;
  resource_state: number;
}

export interface StravaGraphPoint {
  day: string;
  distance: number;
}

export interface StravaGraphData {
  swimming: StravaGraphPoint[];
  running: StravaGraphPoint[];
  riding: StravaGraphPoint[];
  combinedData: StravaCombinedGraphData[];
}

export interface StravaCombinedGraphData {
  day: string;
  swim: number;
  ride: number;
  run: number;
}

export type StravaContextInterface = {
  isAuthenticated?: boolean;
  loginWithStrava: () => void;
  stravaData: StravaGraphData;
};
