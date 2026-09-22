import { DataTable } from "@/components/ui/Datatable";
import Loading from "@/components/ui/Loading";

import { useSeries } from "@/hooks/use-series";
import { seriesColumns } from "./series.column";

export default function Series() {
  const { series, isLoading, error } = useSeries();

  if (isLoading) return <Loading />
  if (error) return <p>Error: {error}</p>

  return (
    <div className="bg-background-paper p-4 rounded-lg">
      <DataTable columns={seriesColumns} data={series} keyExtractor={(series) => series.id} />
    </div>
  )
}