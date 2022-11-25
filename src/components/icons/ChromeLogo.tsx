import React from "react";

interface ChromeLogoProps {}

export const ChromeLogo: React.FC<ChromeLogoProps> = ({}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 190 190"
      height="30"
      width="30"
      className="w-8"
    >
      <linearGradient
        id="d"
        x1="28.3"
        x2="80.8"
        y1="75"
        y2="44.4"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#a52714" stopOpacity=".6"></stop>
        <stop offset=".7" stopColor="#a52714" stopOpacity="0"></stop>
      </linearGradient>
      <linearGradient
        id="f"
        x1="109.9"
        x2="51.5"
        y1="164.5"
        y2="130.3"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#055524" stopOpacity=".4"></stop>
        <stop offset=".3" stopColor="#055524" stopOpacity="0"></stop>
      </linearGradient>
      <linearGradient
        id="h"
        x1="121.9"
        x2="136.6"
        y1="49.8"
        y2="114.1"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#ea6100" stopOpacity=".3"></stop>
        <stop offset=".7" stopColor="#ea6100" stopOpacity="0"></stop>
      </linearGradient>
      <radialGradient
        id="a"
        cx="91.2"
        cy="55"
        r="84.1"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#3e2723" stopOpacity=".2"></stop>
        <stop offset="1" stopColor="#3e2723" stopOpacity="0"></stop>
      </radialGradient>
      <radialGradient
        id="i"
        cx="20.9"
        cy="47.5"
        r="78"
        xlinkHref="#a"
      ></radialGradient>
      <radialGradient
        id="j"
        cx="94.8"
        cy="95.1"
        r="87.9"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#263238" stopOpacity=".2"></stop>
        <stop offset="1" stopColor="#263238" stopOpacity="0"></stop>
      </radialGradient>
      <radialGradient
        id="k"
        cx="33.3"
        cy="31"
        r="176.8"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#fff" stopOpacity=".1"></stop>
        <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
      </radialGradient>
      <clipPath id="b">
        <circle cx="95" cy="95" r="88"></circle>
      </clipPath>
      <g clipPath="url(#b)">
        <use fill="#db4437" xlinkHref="#c"></use>
        <use fill="url(#d)" xlinkHref="#c"></use>
        <use fill="#0f9d58" xlinkHref="#e"></use>
        <use fill="url(#f)" xlinkHref="#e"></use>
        <use fill="#ffcd40" xlinkHref="#g"></use>
        <use fill="url(#h)" xlinkHref="#g"></use>
        <g fillOpacity=".1">
          <path fill="#3e2723" d="M61.3 114.7L21 47.4l39 67.8z"></path>
          <path fill="#263238" d="M128.8 116.3l-.8-.4-37.3 67 38.3-67z"></path>
        </g>
        <path id="e" d="M7 183h83.8l39-39v-29H60.2L7 23.5z"></path>
        <path id="g" d="M95 55l34.6 60L91 183h92V55z"></path>
        <path id="c" d="M21 7v108h39.4L95 55h88V7z"></path>
        <path fill="url(#a)" d="M95 55v21l78.4-21z"></path>
        <path fill="url(#i)" d="M21 47.5l57.2 57.2L60.4 115z"></path>
        <path fill="url(#j)" d="M90.8 183l21-78.3 17.8 10.3z"></path>
        <circle cx="95" cy="95" r="40" fill="#f1f1f1"></circle>
        <circle cx="95" cy="95" r="32" fill="#4285f4"></circle>
        <circle cx="95" cy="95" r="88" fill="url(#k)"></circle>
        <g fill="#3e2723" fillOpacity=".1">
          <path
            fill="#fff"
            d="M129.6 115a40 40 0 01-69.2 0L7 24.5 60.4 116a40 40 0 0069.2 0z"
          ></path>
          <path d="M96 55h-.5a40 40 0 110 80h.5c22 0 40-18 40-40s-18-40-40-40zm-1 127a88 88 0 0088-87.5v.5A88 88 0 017 95v-.5A88 88 0 0095 182z"></path>
          <g fillOpacity=".2">
            <path
              fill="#fff"
              d="M130 116.3a39.3 39.3 0 003.4-32 38 38 0 01-3.8 30.7L92 183l38.2-66.5zM95 8a88 88 0 0188 87.5V95A88 88 0 007 95v.5A88 88 0 0195 8z"
            ></path>
            <path d="M95 54c-22 0-40 18-40 40v1c0-22 18-40 40-40h88v-1z"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};
