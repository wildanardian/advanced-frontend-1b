// components/ui/ContentGrid.tsx
import type { Content } from '@/features/film/film.types';
import WatchlistCard from './WatchlistCard';

interface ContentGridProps {
  items: Content[];
  onToggleWatchlist: (content: Content) => void;
  emptyMessage?: string;
}

export function ContentGrid({ items, onToggleWatchlist, emptyMessage = 'Belum ada konten.' }: ContentGridProps) {
  if (items.length === 0) {
    return <p className="text-neutral-400">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
      {items.map((content) => (
        <WatchlistCard
          key={content.id}
          content={content}
          onClick={() => { }}
          onPlay={() => { }}
          onToggleWatchlist={() => onToggleWatchlist(content)}
        />
      ))}
    </div>
  );
}
