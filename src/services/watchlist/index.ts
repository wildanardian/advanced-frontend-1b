import { apiWatchlistRepository } from "./apiWatchlistRepository";
import { localStorageWatchlistRepository } from "./localStorageWatchlistRepository";
import type { WatchlistRepository } from './watchlist-repository';

const STORAGE_MODE = import.meta.env.VITE_WATCHLIST_STORAGE_MODE;

export const watchlistRepository: WatchlistRepository = STORAGE_MODE === 'api' ? apiWatchlistRepository : localStorageWatchlistRepository;