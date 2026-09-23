import { apiClient } from "@/lib/axios";
import type { Content, Film, Series } from "@/features/film/film.types";

/**
 * Generic GET function untuk mengambil data dari API
 * @param {string} endpoint - Endpoint API yang akan diakses
 * @returns {Promise<any>} Data dari API
 */
export const getData = async (endpoint: string): Promise<any> => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

/**
 * Get all films
 */
export const getFilms = async (): Promise<Film[]> => {
  return await getData('/films');
};

/**
 * Get all series
 */
export const getSeries = async (): Promise<Series[]> => {
  return await getData('/series');
};

/**
 * Get watchlist
 */
export const getWatchlist = async (): Promise<Content[]> => {
  return await getData('/watchlist');
};
