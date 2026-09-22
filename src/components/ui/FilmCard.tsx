import type { Content } from "@/features/film/film.types"
import { Fragment, type MouseEvent, type RefObject } from "react";
import { HoverPreviewPortal } from "./HoverPreviewPortal";
import { useHoverPreview } from "@/hooks/user-hover-preview";
import { Check, ChevronDown, Play, Plus } from "lucide-react";
import { convertMinuteToHour } from "@/utils/convert-minute-to-hour";
import { useAppDispatch, useAppSelector } from "@/slice/hooks";
import { toggleWatchlist } from "@/slice/watchlistSlice";
import { openDetailModal } from "@/slice/detailModalSlice";
import { useNavigate } from "react-router-dom";

export interface FilmCardProps {
  content: Content;
  carouselViewportRef?: RefObject<HTMLDivElement | null>;
  // isInWatchlist?: boolean;
  onClick: () => void;
  onPlay: () => void;
  onToggleWatchlist: (content: Content) => void;
}

export default function FilmCard(props: FilmCardProps) {
  const navigate = useNavigate();
  const { cardRef, position, open, scheduleClose, clearCloseTimer } = useHoverPreview({
    carouselViewportRef: props.carouselViewportRef,
  });
  const stopPropagation = (e: MouseEvent<HTMLButtonElement>) => e.stopPropagation();

  const handlePlay = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    props.onPlay();
    navigate(`/watch/${props.content.type}/${props.content.id}`);
  };

  // const handleToggleMyList = (e: MouseEvent<HTMLButtonElement>) => {
  //   e.stopPropagation();
  //   props.onToggleWatchlist?.(props.content);
  // };

  // const isInWatchlist = useAppSelector((state: RootState) => state.watchlist.items.some((item) => item.id === props.content.id));
  // const dispatch = useDispatch<AppDispatch>();
  const dispatch = useAppDispatch();
  const isInWatchlist = useAppSelector((state) =>
    state.watchlist.items.some((item) => item.id === props.content.id)
  );

  const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log('toggle watchlist', props.content);
    dispatch(toggleWatchlist(props.content));
  }

  return (
    <div
      ref={cardRef}
      data-testid={`poster-card-${props.content.id}`}
      onClick={() => dispatch(openDetailModal(props.content.id))}
      className={`group relative h-[144px] w-[96px] md:h-[365px] md:w-[234px] cursor-pointer rounded-lg`}
    >
      <div onPointerEnter={open} onPointerLeave={scheduleClose} className="overflow-hidden rounded-lg">
        <img src={props.content.poster_url} alt={props.content.title} className={`h-[144px] w-[96px] md:h-[365px] md:w-[234px] rounded-lg object-cover`} />
        {/* {item.badge && <span className={BADGE_STYLES[item.badge.variant]}>{item.badge.label}</span>} */}
      </div>

      <HoverPreviewPortal position={position}>
        <div
          onPointerEnter={clearCloseTimer}
          onPointerLeave={scheduleClose}
          className="relative hidden h-[460px] w-[408px] overflow-hidden rounded-lg bg-background-paper text-white shadow-2xl lg:block"
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
                  onClick={handlePlay}
                  aria-label={`Putar ${props.content.title}`}
                  className="flex h-13.5 w-13.5 items-center justify-center rounded-full bg-white text-black transition hover:bg-white/85"
                >
                  <Play className="h-5 w-5 fill-current" />
                </button>
                <button
                  type="button"
                  onClick={handleToggle}
                  aria-label={isInWatchlist ? `Hapus ${props.content.title} dari daftar` : `Tambahkan ${props.content.title} ke daftar`}
                  className="flex h-13.5 w-13.5 items-center justify-center rounded-full border border-white/70 text-white transition hover:border-white hover:bg-white/10"
                >
                  {isInWatchlist ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" /> }
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

            <div className="mb-2 flex items-center gap-4 text-xl text-white/85">
              <span className="rounded-full bg-white/20 px-3 py-1 text-white">{props.content.age_rating}</span>
              {props.content.type === 'film' && <span>{convertMinuteToHour(props.content.duration)}</span>}
              {props.content.type === 'series' && <span>{props.content.episode_count} episodes</span>}
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
