import React from "react";

interface RSSLogoProps {
  fill: string;
  height: number;
  width: number;
}

export const RSSLogo: React.FC<RSSLogoProps> = ({ height, width, fill }) => {
  return (
    <svg
      version="1.1"
      x="0px"
      y="0px"
      height={height}
      width={width}
      viewBox="0 0 1000 1000"
      enableBackground="new 0 0 1000 1000"
      xmlSpace="preserve"
      fill={fill}
    >
      <g>
        <g>
          <path d="M990,911.3c0,43.5-35.2,78.7-78.7,78.7s-78.7-35.2-78.7-78.7c0-410.2-333.7-743.9-743.9-743.9c-43.4,0-78.7-35.2-78.7-78.7C10,45.2,45.3,10,88.7,10C585.8,10,990,414.3,990,911.3z M88.7,378.3C45.3,378.3,10,413.5,10,457c0,43.5,35.2,78.7,78.7,78.7c207.1,0,375.6,168.5,375.6,375.6c0,43.5,35.2,78.7,78.7,78.7c43.5,0,78.7-35.2,78.7-78.7C621.8,617.4,382.6,378.3,88.7,378.3z M151.2,731.2c-65,0-117.5,52.7-117.5,117.6c0,64.9,52.6,117.5,117.5,117.5c64.9,0,117.6-52.6,117.6-117.5C268.9,783.9,216.1,731.2,151.2,731.2z" />
        </g>
      </g>
    </svg>
  );
};
