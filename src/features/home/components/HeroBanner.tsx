import { Button } from "@/components/ui/Button";
import { GenreDropdown, type GenreOption } from "@/components/ui/GenreDropdown";
import { InfoIcon, VolumeXIcon } from "lucide-react";
import { useState } from "react";

import { genreOptions } from "@/data/dummyGenre";
import { useLocation } from "react-router-dom";

interface HeroBannerProps {
  title: string;
  synopsis: string;
  bannerUrl: string;
  ageRating: string;
  isMuted?: boolean;
  onPlay: () => void;
  onMoreInfo: () => void;
  onToggleMute?: () => void;
}

export default function HeroBanner(props: HeroBannerProps) {
  const [selectedGenre, setSelectedGenre] = useState<GenreOption | null>(null);

  const location = useLocation();

  return (
    <div className="relative w-full h-56.25 md:h-146.75">
      {/* Image */}
      <img
        src={props.bannerUrl}
        alt={props.title}
        className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#181a1c]"></div>

      {(location.pathname === "/series" || location.pathname === "/film") && (
        <div className="absolute left-4 top-4 z-20 md:left-8 md:top-8 lg:left-20 lg:top-12 hidden md:block">
          <GenreDropdown
            options={genreOptions}
            selected={selectedGenre}
            onSelect={setSelectedGenre}
            className="text-xs md:text-sm"
            triggerClassName="px-4 py-2 min-w-[115px] w-auto h-[44px]"
          />
        </div>
      )}

      <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-4 pt-10 md:px-8 md:pb-8 lg:px-20 lg:pb-20 text-white gap-3 md:gap-10">
        {/* Title */}
        <h1 className="max-w-2xl text-2xl font-black leading-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)] sm:text-4xl md:text-5xl lg:text-7xl">
          {props.title}
        </h1>
        {/* Synopsis */}
        <p className="max-w-2xl text-xxs leading-4 text-white/85 sm:text-sm sm:leading-5 md:text-base lg:text-[1.05rem] lg:leading-7 line-clamp-2 md:line-clamp-3">
          {props.synopsis}
        </p>

        <div className="flex lg:justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="primary" size="pill" onClick={props.onPlay}>
              Mulai
            </Button>
            <Button variant="secondary" size="pill" icon={<InfoIcon size={16} />} onClick={props.onMoreInfo}>
              Selengkapnya
            </Button>
            <span className="border border-secondary-100 bg-black/15 text-secondary-100 inline-flex px-1 py-1 lg:px-2.5 lg:py-2.5 items-center justify-center rounded-full text-xs lg:text-base font-semibold">
              {props.ageRating}
            </span>
          </div>

          <button
            onClick={props.onToggleMute}
            className="inline-flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full border border-secondary-100 text-secondary-100 backdrop-blur-sm transition hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 lg:h-12 lg:w-12"
          >
            <VolumeXIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}