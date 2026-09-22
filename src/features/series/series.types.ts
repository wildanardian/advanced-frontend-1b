import type { Cast, Series } from '@/features/film/film.types';

export interface Episode {
  id: string;
  content_id: string;
  episode_number: number;
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  duration: string;
}

export interface SeriesDetail extends Series {
  episodes: Episode[];
  casts: Cast[];
  creator: string;
}