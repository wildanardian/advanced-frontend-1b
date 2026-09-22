import type { Content } from '@/features/film/film.types';

export interface WatchProgress {
  id: string;                    // id unik record progress ini, BUKAN id film
  content: Content;               // relasi: konten yang lagi ditonton
  episode_id?: string;             // id episode spesifik, kalau type: 'series'
  episode_label?: string;          // "Episode 1" — buat ditampilkan
  progress_seconds: number;
  duration_seconds: number;
  has_new_episode?: boolean;
  last_watched_at: string;         // ISO date, untuk sorting "terakhir ditonton"
}