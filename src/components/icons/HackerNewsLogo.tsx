import React from "react";

interface HackerNewsLogoProps {
  fill: string;
  height: number;
  width: number;
}

export const HackerNewsLogo: React.FC<HackerNewsLogoProps> = ({
  fill,
  height,
  width,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      id="Capa_1"
      x="0px"
      y="0px"
      height={height}
      width={width}
      fill={fill}
      viewBox="0 0 30.961 30.961"
      xmlSpace="preserve"
    >
      <g>
        <g>
          <path d="M21.27,0c-1.174,2.021-5.5,9.464-5.532,9.499h-0.11C15.595,9.464,11.424,2.073,10.253,0H3.148l9.253,15.034v15.927h6.157    V15.034L27.812,0H21.27z" />
        </g>
      </g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </svg>
  );
};
