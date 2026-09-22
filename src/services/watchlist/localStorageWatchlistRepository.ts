import type {Content} from "@/features/film/film.types";
import type { WatchlistRepository } from './watchlist-repository';

const STORAGE_KEY = 'watchlist';

function readStorage(): Content[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStorage(items: Content[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export const localStorageWatchlistRepository: WatchlistRepository = {
  getAll: async () => {
    return readStorage();
  },
  add: async (content) => {
    const items = readStorage();
    if (!items.some((item) => item.id === content.id)) {
      writeStorage([...items, content]);
    }
  },
  remove: async (contentId) => {
    const items = readStorage();
    writeStorage(items.filter((item) => item.id !== contentId));
  }
}