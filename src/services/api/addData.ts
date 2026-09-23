import { apiClient } from "@/lib/axios";
import type { Content, Film } from "@/features/film/film.types";

/**
 * Generic POST function untuk menambah data ke API
 * @param {string} endpoint - Endpoint API yang akan diakses
 * @param {object} data - Data yang akan ditambahkan
 * @returns {Promise<any>} Data dari API response
 */
export const addData = async (endpoint: string, data: any): Promise<any> => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error adding data:', error);
    throw error;
  }
};

/**
 * Add new film
 */
export const addFilm = async (filmData: any): Promise<Film> => {
  return await addData('/films', filmData);
};

/**
 * Add to watchlist
 */
export const addToWatchlist = async (contentData: Content): Promise<Content> => {
  return await addData('/watchlist', contentData);
};
