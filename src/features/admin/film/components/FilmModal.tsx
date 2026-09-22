import type { Film } from "@/features/film/film.types";
import { labelsToIds, idsToLabels } from "@/utils/convert-label-to-id";
import { useState } from "react";
import { GenreSelect } from "@/components/ui/GenreSelect";

type FilmFormState = {
  title: string;
  release_year: number;
  duration: number;
  rating: number;
  slug: string;
  genres: string[]; // internal state pakai id
};

const emptyForm: FilmFormState = {
  title: "",
  slug: "",
  release_year: new Date().getFullYear(),
  duration: 0,
  rating: 0,
  genres: [],
};

function filmToFormState(film: Film): FilmFormState {
  return {
    title: film.title,
    slug: film.slug,
    release_year: film.release_year,
    duration: film.duration,
    rating: film.rating,
    genres: labelsToIds(film.genres),
  };
}

type FilmModalProps =
  | { mode: "create"; film?: undefined; onSubmit: (data: Partial<Film>) => Promise<void>; onClose: () => void }
  | { mode: "edit"; film: Film; onSubmit: (data: Partial<Film>) => Promise<void>; onClose: () => void };

export function FilmModal({ mode, film, onSubmit, onClose }: FilmModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<FilmFormState>(
    mode === "edit" ? filmToFormState(film) : emptyForm
  );

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await onSubmit(
        { ...form, 
          synopsis: film?.synopsis ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          poster_url: film?.poster_url ?? "/src/assets/images/placeholder/placeholder-image-vertical.png",
          banner_url: film?.banner_url ?? "/src/assets/images/placeholder/placeholder.jpeg",
          genres: idsToLabels(form.genres) 
        });
    } catch (error) {
      console.error(`Error ${mode === "create" ? "creating" : "updating"} film:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center" onClick={onClose}>
      <div className="bg-background-paper p-6 rounded-lg w-96 space-y-3" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold">
          {mode === "create" ? "Tambah Film" : "Edit Film"}
        </h2>

        <div className="flex flex-col gap-1">
          <label htmlFor="title">Judul</label>
          <input className="flex px-4 py-2 rounded-md border border-outline-border/23 bg-background-paper w-full" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="genres">Genre</label>
          <GenreSelect
            value={form.genres}
            onChange={(genres) => setForm({ ...form, genres })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="release_year">Rilis Tahun</label>
          <input type="number" className="flex px-4 py-2 rounded-md border border-outline-border/23 bg-background-paper w-full" value={form.release_year}
            onChange={(e) => setForm({ ...form, release_year: +e.target.value })} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="duration">Durasi (dalam menit)</label>
          <input type="number" className="flex px-4 py-2 rounded-md border border-outline-border/23 bg-background-paper w-full" value={form.duration}
            onChange={(e) => setForm({ ...form, duration: +e.target.value })} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="rating">Rating</label>
          <input type="number" step="0.1" className="flex px-4 py-2 rounded-md border border-outline-border/23 bg-background-paper w-full" value={form.rating}
            onChange={(e) => setForm({ ...form, rating: +e.target.value })} />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button className="border border-outline-border px-3 py-1 rounded hover:bg-background-page-header" onClick={onClose}>Batal</button>
          <button className="bg-primary-main px-3 py-1 rounded hover:bg-primary-main-200" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Menyimpan..." : mode === "create" ? "Tambah" : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}