import { getSeries } from "@/services/api/getData";
import { useAppDispatch, useAppSelector } from "../store/redux/hooks";
import { setSeries, setLoading, setError } from "../store/redux/dataReducer";
import { useEffect } from "react";

export const useSeries = () => {
  const dispatch = useAppDispatch();
  const series = useAppSelector((state) => state.data.series);
  const status = useAppSelector((state) => state.data.status);
  const error = useAppSelector((state) => state.data.error);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        dispatch(setLoading());
        const data = await getSeries();
        dispatch(setSeries(data));
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : "An error occurred"));
      }
    };

    fetchSeries();
  }, [dispatch]);

  return { series, isLoading: status === 'loading', error };
}
