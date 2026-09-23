import { apiClient } from "@/lib/axios";

/**
 * Generic DELETE function untuk menghapus data dari API
 * @param {string} endpoint - Endpoint API yang akan diakses
 * @param {string} id - ID dari data yang akan dihapus
 * @returns {Promise<any>} Data dari API response
 */
export const deleteData = async (endpoint: string, id: string): Promise<any> => {
  try {
    const response = await apiClient.delete(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};

/**
 * Delete film
 */
export const deleteFilm = async (filmId: string): Promise<void> => {
  return await deleteData('/films', filmId);
};

/**
 * Remove from watchlist
 */
export const removeFromWatchlist = async (contentId: string): Promise<void> => {
  return await deleteData('/watchlist', contentId);
};