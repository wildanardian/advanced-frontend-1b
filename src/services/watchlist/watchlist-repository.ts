import type {Content} from "@/features/film/film.types";

export interface WatchlistRepository {
  getAll: () => Promise<Content[]>;
  add: (content: Content) => Promise<void>;
  remove: (contentId: string) => Promise<void>;
}