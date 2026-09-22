import { apiClient } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import type { Film } from './film.types';

//get all data film
export const getFilms = async (): Promise<Film[]> => {
  const {data} = await apiClient.get(ENDPOINTS.FILMS);
  return data;
}

export const createFilm = async (payload: Partial<Film>): Promise<Film> => {
  const { data } = await apiClient.post(ENDPOINTS.FILMS, payload);
  return data;
}

export const updateFilm = async (id: string, payload: Partial<Film>): Promise<Film> => {
  const { data } = await apiClient.put(`${ENDPOINTS.FILMS}/${id}`, payload);
  return data;
};

export const deleteFilm = async (id: string): Promise<void> => {
  await apiClient.delete(`${ENDPOINTS.FILMS}/${id}`);
};