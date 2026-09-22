import placeholder from '@/assets/images/placeholder/thumbnail-series.svg';

export default function DummySeriesEpisode({ index }: { index: number }) {
  return (
    <article
      key={index.toExponential()}
      className={`grid grid-cols-[24px_170px_1fr] items-center gap-6 rounded px-6 py-4 hover:bg-white/20`}
    >
      <span className="text-center text-base text-white">{index + 1}</span>
      <img src={placeholder} alt={index.toString()} className="h-24 w-42.5 rounded object-cover" />
      <div className="min-w-0">
        <div className="mb-1 flex items-start justify-between gap-3">
          <h4 className="truncate text-sm font-700 text-white">Episode {index + 1}</h4>
          <span className="shrink-0 text-xs text-white/85">45 min</span>
        </div>
        <p className="line-clamp-2 text-sm leading-5 text-white/70">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
      </div>
    </article>
  )
}