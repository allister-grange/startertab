import React from "react";

interface HackerNewsLogoProps {
  color: string;
}

export const HackerNewsLogo: React.FC<HackerNewsLogoProps> = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      id="Capa_1"
      x="0px"
      y="0px"
      width="20.961px"
      height="20.961px"
      viewBox="0 0 30.961 30.961"
      xmlSpace="preserve"
      fill={color}
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
