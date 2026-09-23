import { getFilms } from "@/services/api/getData";
import { useAppDispatch, useAppSelector } from "../store/redux/hooks";
import { setFilms, setLoading, setError } from "../store/redux/dataReducer";
import { useCallback, useEffect } from "react";
// import type { Content } from "@/features/film/film.types";

export const useFilms = () => {
  const dispatch = useAppDispatch();
  const films = useAppSelector((state) => state.data.films);
  const status = useAppSelector((state) => state.data.status);
  const error = useAppSelector((state) => state.data.error);

  const fetchFilms = useCallback(async () => {
    try {
      dispatch(setLoading());
      const data = await getFilms();
      dispatch(setFilms(data));
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'An unknown error occurred'));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchFilms();
  }, [fetchFilms]);

  return { 
    films, 
    isLoading: status === 'loading', 
    error, 
    refetch: fetchFilms 
  };
}