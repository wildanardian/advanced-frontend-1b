/* eslint-disable @typescript-eslint/no-explicit-any */
// types.ts
export type Column<T> =
  | { key: keyof T; header: string; render?: (row: T) => React.ReactNode; width?: string }
  | { key: string; header: string; render: (row: T) => React.ReactNode; width?: string };

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string | number;
}

function DataTable<T>({ columns, data, keyExtractor }: DataTableProps<T>) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-gray-400 text-left border-b border-gray-700">
          {columns.map((col) => (
            <th key={String(col.key)} className="py-3 px-2 font-bold text-white" style={{ width: col.width }}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={keyExtractor(row)} className="border-b border-gray-800 hover:bg-gray-900">
            {columns.map((col) => (
              <td key={String(col.key)} className="py-3 px-2 text-gray-200">
                {col.render ? col.render(row) : (row as any)[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export { DataTable };