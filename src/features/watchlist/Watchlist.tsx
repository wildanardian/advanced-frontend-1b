// features/watchlist/Watchlist.tsx
import { useAppDispatch, useAppSelector } from '@/store/redux/hooks';
import { addToWatchlist, removeFromWatchlist } from '@/store/redux/dataReducer';
import { ContentGrid } from '@/components/ui/ContentGrid';
import type { Content } from '../film/film.types';
import { addToWatchlist as addToWatchlistApi } from '../../services/api/addData';
import { removeFromWatchlist as removeFromWatchlistDeleteApi } from '@/services/api/deleteData';

export function Watchlist() {
  const items = useAppSelector((state) => state.data.watchlist);
  const dispatch = useAppDispatch();

  const handleToggleWatchlist = async (content: Content) => {
    const exists = items.some((item) => item.id === content.id);
    
    try {
      if (exists) {
        await removeFromWatchlistDeleteApi(content.id);
        dispatch(removeFromWatchlist(content.id));
      } else {
        await addToWatchlistApi(content);
        dispatch(addToWatchlist(content));
      }
    } catch (error) {
      console.error("Error toggling watchlist:", error);
    }
  };

  return (
    <div className="px-5 pt-8 pb-12 md:px-10 md:pt-10 lg:px-[54px] lg:pt-9 lg:pb-14">
      <h1 className="mb-8 text-2xl font-bold text-white md:text-[32px]">Daftar Saya</h1>

      <ContentGrid
        items={items}
        onToggleWatchlist={handleToggleWatchlist}
        emptyMessage="Belum ada film/series di daftar kamu."
      />
    </div>
  );
}
