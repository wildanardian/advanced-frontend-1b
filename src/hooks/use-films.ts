import { getFilms } from "@/features/film/film.api";
import type { Film } from "@/features/film/film.types";
import { useCallback, useEffect, useState } from "react";

export const useFilms = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFilms = useCallback(async () => {
    try {
      const data = await getFilms();
      setFilms(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFilms();
  }, [fetchFilms]);

  return { films, isLoading, error, refetch: fetchFilms };
}