import type { Episode } from "../series.types";

export default function EpisodeList({episode, index}: {episode: Episode, index: number}) {
  return (
    <article
      key={episode.id}
      className={`grid grid-cols-[24px_170px_1fr] items-center gap-6 rounded px-6 py-4 ${index === 0 ? 'bg-white/20' : ''}`}
    >
      <span className="text-center text-base text-white">{episode.episode_number}</span>
      <img src={episode.thumbnail_url} alt={episode.title} className="h-24 w-42.5 rounded object-cover" />
      <div className="min-w-0">
        <div className="mb-1 flex items-start justify-between gap-3">
          <h4 className="truncate text-sm font-700 text-white">{episode.title}</h4>
          <span className="shrink-0 text-xs text-white/85">{episode.duration}</span>
        </div>
        <p className="line-clamp-2 text-sm leading-5 text-white/70">{episode.description}</p>
      </div>
    </article>
  )
}