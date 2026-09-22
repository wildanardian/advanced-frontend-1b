import placeholder from '@/assets/images/placeholder/thumbnail-series.svg'
import { createContext, useContext, useState } from 'react';

interface EpisodeItemProps {
  id: string;
  thumbnail?: string;
  title: string;
  description: string;
}

interface EpisodeContextType {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
}

const EpisodeContext = createContext<EpisodeContextType | null>(null);

export function EpisodeModal({ show, children, defaultActiveId }: { show: boolean; children: React.ReactNode; defaultActiveId?: string }) {
  const [activeId, setActiveId] = useState<string | null>(defaultActiveId || null);

  if (!show) return null;

  return (
    <EpisodeContext.Provider value={{ activeId, setActiveId }}>
      <div className="absolute bottom-20 right-10 w-[457px] bg-background-paper rounded-lg">
        {children}
      </div>
    </EpisodeContext.Provider>
  )
}

function EpisodeItem(props: EpisodeItemProps) {
  const { id, thumbnail, title, description } = props;

  const context = useContext(EpisodeContext);
  if (!context) {
    throw new Error('EpisodeItem must be used within an EpisodeModal');
  }
  const { activeId, setActiveId } = context;
  const isActive = activeId === id;

  return (
    <button
      type="button"
      onClick={() => setActiveId(isActive ? null : id)}
      className="flex flex-col w-full cursor-pointer items-start gap-2 rounded px-3 py-2 text-left transition-colors hover:bg-background-page-header focus-visible:bg-background-page-header focus-visible:outline-none"
      key={id}
    >
      <span className="text-[16px] text-light-main">Episode {id}</span>
      {isActive && (
        <div className="flex items-start gap-3">
          <img src={thumbnail ? thumbnail : placeholder} alt={title} className="w-[170px] h-[96px] object-cover rounded" />
          <div className="flex flex-col gap-1">
            <span className="text-sm text-light-main">{title}</span>
            <span className="text-sm text-light-main line-clamp-3">{description}</span>
          </div>
        </div>
      )}
    </button>
  )
}

EpisodeModal.Item = EpisodeItem;
export default EpisodeModal;