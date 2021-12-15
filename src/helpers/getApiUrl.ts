export const getApiUrl = (): string => {
  return process.env.VERCEL_URL
    ? process.env.VERCEL_URL
    : process.env.API_URL!;
};
