export const PauseIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg
    role="img"
    height="24"
    width="24"
    viewBox="0 0 16 16"
    className="Svg-sc-1bi12j5-0 hDgDGI"
    fill={color}
    style={{ margin: "auto" }}
  >
    <path fill="none" d="M0 0h16v16H0z"></path>
    <path d="M3 2h3v12H3zm7 0h3v12h-3z"></path>
  </svg>
);

export const SkipRight: React.FC<{ color: string }> = ({ color }) => (
  <svg
    fill={color}
    style={{ margin: "auto" }}
    role="img"
    height="18"
    width="18"
    viewBox="0 0 16 16"
  >
    <path d="M11 3v4.119L3 2.5v11l8-4.619V13h2V3z"></path>
  </svg>
);

export const SkipLeft: React.FC<{ color: string }> = ({ color }) => (
  <svg
    fill={color}
    style={{ margin: "auto" }}
    role="img"
    height="18"
    width="18"
    viewBox="0 0 16 16"
  >
    <path d="M13 2.5L5 7.119V3H3v10h2V8.881l8 4.619z"></path>
  </svg>
);

export const PlayIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg
    role="img"
    style={{ margin: "auto" }}
    height="24"
    width="24"
    viewBox="0 0 16 16"
    fill={color}
  >
    <path d="M4.018 14L14.41 8 4.018 2z"></path>
  </svg>
);
