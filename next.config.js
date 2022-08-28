/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    STRAVA_CLIENT: process.env.STRAVA_CLIENT,
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});
