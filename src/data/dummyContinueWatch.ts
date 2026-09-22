// src/data/dummyContinueWatching.ts
import { dummyFilms } from './dummyFilm';
import type { WatchProgress } from '@/features/home/home.types';

export const dummyContinueWatching: WatchProgress[] = [
  {
    id: 'wp1',
    content: dummyFilms[0], // reference ke "Duty After School" (atau item pertama di dummyFilms)
    episode_label: 'Episode 1',
    progress_seconds: 5580,
    duration_seconds: 9180,
    has_new_episode: false,
    last_watched_at: '2026-09-06T20:15:00Z',
  },
  {
    id: 'wp2',
    content: dummyFilms[1], // "A Man Called Otto"
    episode_label: undefined,
    progress_seconds: 1200,
    duration_seconds: 7440,
    has_new_episode: false,
    last_watched_at: '2026-09-05T18:30:00Z',
  },
  {
    id: 'wp3',
    content: dummyFilms[2], // "Ted Lasso"
    episode_label: 'Episode 3',
    progress_seconds: 900,
    duration_seconds: 1800,
    has_new_episode: true,
    last_watched_at: '2026-09-07T09:00:00Z',
  },
];