export type ContentType = 'film' | 'series'

interface BaseContent {
  id: string;
  title: string;
  slug: string;
  type: ContentType;
  synopsis: string;
  poster_url: string;
  banner_url: string;
  age_rating: string;
  release_year: number;
  is_trending: boolean;
  genres: string[];
  rating: number;
}

export interface Film extends BaseContent {
  type: 'film';
  duration: number;
}

export interface Series extends BaseContent {
  type: 'series';
  episode_count: number;
}

export type Content = Film | Series;

export interface Cast {
  id: string;
  name: string;
  photo_url?: string;
  role?: string;
}

export interface FilmDetail extends Film {
  casts: Cast[];
  creator: string;
}