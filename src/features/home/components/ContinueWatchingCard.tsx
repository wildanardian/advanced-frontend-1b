import { HoverPreviewPortal } from "@/components/ui/HoverPreviewPortal";
import type { Content } from "@/features/film/film.types";
import { useHoverPreview } from "@/hooks/user-hover-preview";
import { convertMinuteToHour } from "@/utils/convert-minute-to-hour";
import { Check, ChevronDown, Play, Plus } from "lucide-react";
import { Fragment, type MouseEvent, type RefObject } from "react";

interface ContinueWatchingCardProps {
  content: Content;
  progressPercent: number;
  totalDuration: number;
  episodeLabel: string;
  carouselViewportRef?: RefObject<HTMLDivElement | null>
  isInWatchlist?: boolean;
  onClick: () => void;
  onPlay: () => void;
  onToggleWatchlist: (content: Content) => void;
}

export default function ContinueWatchingCard(props: ContinueWatchingCardProps) {
  const { cardRef, position, open, scheduleClose, clearCloseTimer } = useHoverPreview({
    carouselViewportRef: props.carouselViewportRef,
  });
  const stopPropagation = (e: MouseEvent<HTMLButtonElement>) => e.stopPropagation();

  const handleToggleMyList = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    props.onToggleWatchlist?.(props.content);
  };

  const CARD_SIZE = 'w-[309px] h-[151px] lg:h-[162px] lg:w-[302px]';

  // console.log('progressPercent:', props.progressPercent, 'film name: ', props.content.title);

  return (
    <div
      ref={cardRef}
      data-testid={`poster-card-${props.content.id}`}
      onClick={() => props.onClick()}
      className={`group relative ${CARD_SIZE} cursor-pointer rounded-lg`}
    >
      <div onPointerEnter={open} onPointerLeave={scheduleClose} className="overflow-hidden rounded-lg">
        <img src={props.content.banner_url} alt={props.content.title} className={`${CARD_SIZE} rounded-lg object-cover`} />
        {/* {item.badge && <span className={BADGE_STYLES[item.badge.variant]}>{item.badge.label}</span>} */}
      </div>

      <HoverPreviewPortal position={position}>
        <div
          onPointerEnter={clearCloseTimer}
          onPointerLeave={scheduleClose}
          className={`relative hidden ${props.content.type === 'series' ? 'h-[494px]' : 'h-[453px]'} w-[408px] overflow-hidden rounded-lg bg-background-paper text-white shadow-2xl lg:block`}
        >
          <img
            src={props.content.banner_url ?? props.content.poster_url}
            alt={props.content.title}
            className="h-[254px] w-full bg-black object-cover"
          />

          <div className="h-[180px] bg-background-paper p-7.5">
            <div className="mb-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={stopPropagation}
                  aria-label={`Putar ${props.content.title}`}
                  className="flex h-13.5 w-13.5 items-center justify-center rounded-full bg-white text-black transition hover:bg-white/85"
                >
                  <Play className="h-5 w-5 fill-current" />
                </button>
                <button
                  type="button"
                  onClick={handleToggleMyList}
                  aria-label={props.isInWatchlist ? `Hapus ${props.content.title} dari daftar` : `Tambahkan ${props.content.title} ke daftar`}
                  className="flex h-13.5 w-13.5 items-center justify-center rounded-full border border-white/70 text-white transition hover:border-white hover:bg-white/10"
                >
                  {props.isInWatchlist ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                </button>
              </div>
              <button
                type="button"
                onClick={stopPropagation}
                aria-label={`Info selengkapnya tentang ${props.content.title}`}
                className="flex h-13.5 w-13.5 items-center justify-center rounded-full border border-white/70 text-white transition hover:border-white hover:bg-white/10"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>

            {props.content.type === 'series' && (
              <p className="text-white text-xl mb-4">"{props.episodeLabel}"</p>
            )}

            <div className="mb-2 flex items-center gap-4 text-xl text-white/85">
              <div className="flex-1 bg-neutral-700 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-1 rounded-full"
                  style={{ width: `${props.progressPercent || 0}%` }}
                />
              </div>

              {props.content.type === 'film' && <span>{convertMinuteToHour(props.content.duration)}</span>}
              {props.content.type === 'series' && <span>{convertMinuteToHour(props.totalDuration)}</span>}
            </div>

            <div className="flex w-full items-center justify-between text-lg text-light-secondary">
              {props.content.genres.map((genre, index) => (
                <Fragment key={genre}>
                  <span>{genre}</span>
                  {index < props.content.genres.length - 1 && (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-light-secondary" aria-hidden="true" />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </HoverPreviewPortal>
    </div>
  )
}