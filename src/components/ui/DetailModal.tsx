// features/film/components/DetailModal.tsx
import { dummyContentDetails } from '@/data/dummyContentDetail';
import { dummyFilms } from '@/data/dummyFilm';
import { closeDetailModal } from '@/slice/detailModalSlice';
import { useAppDispatch, useAppSelector } from '@/slice/hooks';
import { Plus, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { convertMinuteToHour } from '../../utils/convert-minute-to-hour';
import DummySeriesEpisode from './DummySeriesEpisode';
// import EpisodeList from '@/features/series/EpisodeList';

export default function DetailModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectedContentId = useAppSelector((state) => state.detailModal.selectedContentId);

  const content = dummyContentDetails.find((item) => item.id === selectedContentId);

  if (!content) return null;

  const recommendations = dummyFilms.filter((item) => item.id !== content.id).slice(0, 3);

  const handleStartWatching = () => {
    dispatch(closeDetailModal());
    navigate(`/watch/${content.type}/${content.id}`, {
      state: { title: content.title },
    });
  };

  return createPortal(
    <div
      className="fixed inset-0 z-1000 overflow-y-auto bg-background-page-header/90 px-5 py-8 text-white backdrop-blur-[2px] md:px-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="media-detail-title"
      onMouseDown={() => dispatch(closeDetailModal())}
    >
      <div
        className="mx-auto min-h-[70vh] w-full max-w-230 overflow-hidden rounded bg-background-page-header shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="relative h-[190px] md:h-[554px] overflow-hidden md:min-h-[470px]">
          <img src={content.banner_url} alt={content.title} className="absolute inset-0 h-[190px] lg:h-[554px] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-mid-black/50 to-background-page-header" />
          <button
            type="button"
            onClick={() => dispatch(closeDetailModal())}
            aria-label="Tutup detail"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-background-page-header/85 text-white transition hover:bg-background-extra"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute inset-x-0 bottom-0 px-5 pb-8 md:px-14 md:py-20">
            <h2 id="media-detail-title" className="mb-2 lg:mb-6 w-full text-base font-700 leading-tight md:text-4xl">
              {content.title}
            </h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 lg:gap-2.5">
                <button
                  type="button"
                  onClick={handleStartWatching}
                  className="flex items-center gap-2 rounded-full bg-primary-main-300 px-3 py-1 lg:px-10 lg:py-2.5 text-xs lg:text-base font-700 text-white transition hover:bg-primary-main-200"
                >
                  Mulai
                </button>
                <button
                  type="button"
                  className="flex h-6 w-6 lg:h-11 lg:w-11 items-center justify-center rounded-full border border-white/70 text-white transition hover:border-white hover:bg-white/10"
                >
                  <Plus className="h-4 w-4 lg:h-6 lg:w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-2.5 md:px-20 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-10">

            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <span>{content.release_year}</span>
                {content.type === 'film' ? (
                  <span>{convertMinuteToHour(content.duration)}</span>
                ) : (
                  <span>{content.episode_count} episode</span>
                )}
                <span className="rounded-full border border-white/55 px-2 py-0.5">{content.age_rating}</span>
              </div>
              <p className="w-full text-xxs text-white md:text-base line-clamp-3 md:line-clamp-5">{content.synopsis}</p>
            </div>

            <div className="flex flex-col">
              <dl className="grid grid-cols-[86px_1fr] md:grid-cols-[110px_1fr] gap-y-2 md:gap-y-2.5 text-xxs md:text-base leading-5 text-white/85">
                {content.casts.length > 0 && (
                  <>
                    <dt className="text-light-secondary">Cast</dt>
                    <dd>: {content.casts.map((c) => c.name).join(', ')}</dd>
                  </>
                )}
                <dt className="text-light-secondary">Genre</dt>
                <dd>: {content.genres.join(', ')}</dd>
                {content.creator && (
                  <>
                    <dt className="text-light-secondary">Pembuat Film</dt>
                    <dd>: {content.creator}</dd>
                  </>
                )}
              </dl>
            </div>
          </div>
        </div>

        <div className="px-5 py-6 md:px-20 md:py-10">
          {content.type === 'series' && content.episodes.length > 0 && (
            <section className="">
              <h3 className="mb-5 text-xl font-700">Episode</h3>
              <div className="space-y-3">
                {/* {content.episodes.map((episode, index) => (
                  <EpisodeList key={episode.id} episode={episode} index={index} />
                ))} */}
                {content.episode_count > 0 ? (
                  Array.from({ length: content.episode_count }, (_, index) => (
                    <DummySeriesEpisode key={index} index={index} />
                  ))
                ): null}
              </div>
            </section>
          )}

          {content.type === 'film' && recommendations.length > 0 && (
            <section className="">
              <h3 className="mb-5 text-xl font-700">Rekomendasi Serupa</h3>
              <div className="grid grid-cols-3 gap-2.5">
                {recommendations.map((rec) => (
                  <article key={rec.id} className="relative overflow-hidden rounded bg-background-paper">
                    <img src={rec.poster_url} alt={rec.title} className="w-full object-cover" />
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
