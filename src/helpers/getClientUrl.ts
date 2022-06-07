export const getClientUrl = (): string => {
  return process.env.VERCEL_URL
    ? process.env.VERCEL_URL
    : 'http://localhost:3000';
};
