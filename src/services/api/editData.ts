import { apiClient } from "@/lib/axios";
import type { Film } from "@/features/film/film.types";

/**
 * Generic PUT function untuk mengupdate data di API
 * @param {string} endpoint - Endpoint API yang akan diakses
 * @param {string} id - ID dari data yang akan diupdate
 * @param {object} data - Data yang akan diupdate
 * @returns {Promise<any>} Data dari API response
 */
export const editData = async (endpoint: string, id: string, data: any): Promise<any> => {
  try {
    const response = await apiClient.put(`${endpoint}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error editing data:', error);
    throw error;
  }
};

/**
 * Update film
 */
export const updateFilm = async (filmId: string, filmData: any): Promise<Film> => {
  return await editData('/films', filmId, filmData);
};
