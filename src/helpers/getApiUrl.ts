export const getApiUrl = (): string => {
  console.log(process.env.VERCEL_URL);
  
  return process.env.VERCEL_URL
    ? process.env.VERCEL_URL
    : process.env.API_URL!;
};
