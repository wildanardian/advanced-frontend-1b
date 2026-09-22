import { DataTable } from "@/components/ui/Datatable";
import Loading from "@/components/ui/Loading";
import { useFilms } from "@/hooks/use-films";

import { filmColumns } from "@/features/admin/film/film.column";
import type { Film } from "@/features/film/film.types";
import { createFilm, deleteFilm, updateFilm } from "@/features/film/film.api";
import { useState } from "react";
import { FilmModal } from "./components/FilmModal";


export default function Film() {
  const { films, isLoading, error, refetch } = useFilms();
  const [editing, setEditing] = useState<Film | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateFilm = async (data: Partial<Film>) => {
    try {
      await createFilm(data);
      setShowCreateModal(false);
      refetch();
    } catch (error) {
      console.error("Error creating film:", error);
    } finally {
      refetch();
    }
  }

  const handleDelete = async (film: Film) => {
    if (!confirm(`Hapus film dengan judul "${film.title}"?`)) return;
    try {
      await deleteFilm(film.id);
      refetch();
    } catch (error) {
      console.error("Error deleting film:", error);
    }
  }

  const handleUpdate = async (data: Partial<Film>) => {
    if (!editing) return;
    await updateFilm(editing.id, data);
    setEditing(null);
    refetch();
  };

  const columns = filmColumns({ onEdit: setEditing, onDelete: handleDelete });

  if (isLoading) return <Loading />
  if (error) return <p>Error: {error}</p>

  return (
    <div className="bg-background-paper p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Daftar Film</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowCreateModal(true)}
        >
          Tambah Film
        </button>
      </div>
      {films.length === 0 ? (
        <p className="text-gray-400">Belum ada film yang tersedia.</p>
      ) : null}
      <DataTable columns={columns} data={films} keyExtractor={(film) => film.id} />
      {showCreateModal && (
        <FilmModal
          mode="create"
          onSubmit={handleCreateFilm}
          onClose={() => setShowCreateModal(false)}
        />
      )}
      {editing && (
        <FilmModal mode="edit" film={editing} onSubmit={handleUpdate} onClose={() => setEditing(null)} />
      )}
    </div>
  )
}