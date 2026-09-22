import { apiClient } from "@/lib/axios";
import type { WatchlistRepository } from "./watchlist-repository";

export const apiWatchlistRepository: WatchlistRepository = {
  getAll: async () => {
    const response = await apiClient.get('/watchlist');
    return response.data;
  },
  add: async (content) => {
    const response = await apiClient.post('/watchlist', content);
    return response.data;
  },
  remove: async (contentId) => {
    const response = await apiClient.delete(`/watchlist/${contentId}`);
    return response.data;
  }
}