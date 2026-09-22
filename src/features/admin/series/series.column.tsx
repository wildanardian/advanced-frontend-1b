import { type Column } from "@/components/ui/Datatable";
import { type Series } from "@/features/film/film.types";
import { PencilIcon, TrashIcon } from "lucide-react";

export const seriesColumns: Column<Series>[] = [
  {
    key: "poster",
    header: "Poster",
    render: (f) => <img src={f.poster_url} className="w-10 h-14 rounded object-cover" />,
    width: "8%"
  },
  {
    key: "judul",
    header: "Judul",
    render: (f) => <span className="font-medium overflow-clip">{f.title}</span>,
    width: "20%"
  },
  {
    key: "genre",
    header: "Genre", 
    render: (f) => <span className="px-2 py-0.5 rounded">
      {f.genres.map((g) => g).join(", ")}
    </span>,
    width: "20%"
  },
  {
    key: "tahun",
    header: "Tahun Rilis",
    render: (f) => <span className="px-2 py-0.5 rounded">
      {f.release_year}
    </span>,
  },
  {
    key: "durasi",
    header: "Durasi",
    render: (f) => <span className="px-2 py-0.5 rounded">
      {f.episode_count} episode
    </span>
  },
  {
    key: "rating",
    header: "Rating",
    render: (f) => <span className="px-2 py-0.5 rounded">
      {f.rating}
    </span>
  },
  // {
  //   key: "status",
  //   header: "Status",
  //   // render: (f) => (
  //   //   <span className={`px-2 py-0.5 rounded-full text-xs ${f.status === "Published" ? "bg-green-600" : "bg-gray-600"}`}>
  //   //     {f.status}
  //   //   </span>
  //   // ),
  //   render: (f) => (
  //     <span className={`px-2 py-0.5 rounded-full text-xs`}>
  //       ini status published
  //     </span>
  //   ),
  // },
  {
    key: "aksi",
    header: "Aksi",
    render: (f) => (
      <div className="flex gap-2">
        <button onClick={() => {
          alert(`Edit film dengan ID: ${f.id}`);
        }}>
          <PencilIcon className="w-4 h-4 cursor-pointer" />
        </button>
        <button onClick={() => {
          alert(`Hapus film dengan ID: ${f.id}`);
        }}>
          <TrashIcon className="w-4 h-4 text-red-400 cursor-pointer" />
        </button>
      </div>
    ),
  },
];