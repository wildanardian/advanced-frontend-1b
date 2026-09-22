export const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const VITE_WATCHLIST_STORAGE_MODE = import.meta.env.VITE_WATCHLIST_STORAGE_MODE;

if (!VITE_API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL is not defined in .env file');
}