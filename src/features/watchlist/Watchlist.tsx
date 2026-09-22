// features/watchlist/Watchlist.tsx
import { useAppDispatch, useAppSelector } from '@/slice/hooks';
import { toggleWatchlist } from '@/slice/watchlistSlice';
import { ContentGrid } from '@/components/ui/ContentGrid';
import type { Content } from '../film/film.types';
import type { RootState } from '@/slice';

export function Watchlist() {
  const items = useAppSelector((state: RootState) => state.watchlist.items);
  const dispatch = useAppDispatch();

  const handleToggleWatchlist = (content: Content) => {
    dispatch(toggleWatchlist(content));
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
