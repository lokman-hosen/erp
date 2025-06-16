export const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
export const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string;
export const USER_SECRET_KEY = process.env.NEXT_PUBLIC_USER_SECRET_KEY as string;

export const GOOGLE_MAP_NEARBY_RADIUS =
  process.env.GOOGLE_NEARBY_RADIUS || 1000;
