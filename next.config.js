/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    STRAVA_CLIENT: process.env.STRAVA_CLIENT,
  }
}
