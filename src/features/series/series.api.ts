import {apiClient} from "@/lib/axios";
import {ENDPOINTS} from "@/constants/endpoints";
// import type {SeriesDetail} from './series.types';
import type { Series } from "../film/film.types";

//get all data series
export const getSeries = async (): Promise<Series[]> => {
  const {data} = await apiClient.get(ENDPOINTS.SERIES);
  return data;
}