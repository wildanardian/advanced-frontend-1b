import { getSeries } from "@/features/series/series.api";
import type { Series } from "@/features/film/film.types";
import { useEffect, useState } from "react";

export const useSeries = () => {
  const [series, setSeries] = useState<Series[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        setIsLoading(true);
        const data = await getSeries();
        setSeries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeries();
  }, []);

  return { series, isLoading, error };
}