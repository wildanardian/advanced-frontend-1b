import { Carousel } from "@/components/ui/Carousel";
import HeroBanner from "../home/components/HeroBanner";
import { dummyContinueWatching } from "@/data/dummyContinueWatch";
import ContinueWatchingCard from "../home/components/ContinueWatchingCard";
import FilmCard from "@/components/ui/FilmCard";

import seriesHeroBanner from "@/assets/images/hero/hero-series-section-banner.png";
import { useSeries } from "@/hooks/use-series";
import Loading from "@/components/ui/Loading";

export default function Series() {
  const {series, isLoading, error} = useSeries();

  if (isLoading) return <Loading />
  if (error) return <p>Error: {error}</p>

  return (
    <>
      <HeroBanner
        title="Happiness"
        synopsis="Mengisahkan tentang kelompok orang yang berjuang untuk bertahan hidup di dalam sebuah gedung apartemen yang penuh dengan zombie. Sayangnya, virus zombie hanya terdapat di dalam area apartemen tersebut dan tidak menyebar ke luar kawasan apartemen."
        bannerUrl={seriesHeroBanner}
        ageRating="18+"
        onPlay={() => console.log('Play button clicked')}
        onMoreInfo={() => console.log('More Info button clicked')}
      />

      <div className="p-5 lg:p-20 space-y-10">
        <Carousel
          title="Melanjutkan Tonton Series"
          items={dummyContinueWatching}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <ContinueWatchingCard
              key={item.id}
              content={item.content}
              onClick={() => { }}
              progressPercent={(item.progress_seconds / item.duration_seconds) * 100}
              totalDuration={item.duration_seconds}
              episodeLabel={item.episode_label ?? ''}
              onPlay={() => console.log('Play button clicked')}
              onToggleWatchlist={() => console.log('Toggle Watchlist button clicked')}
            />
          )}
        />

        <Carousel
          title="Top Rating Film dan Series Hari ini"
          items={series}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <FilmCard
              key={item.id}
              content={item}
              onClick={() => { }}
              onPlay={() => console.log('Play button clicked')}
              onToggleWatchlist={() => console.log('Toggle Watchlist button clicked')}
            />
          )}
        />
      </div>
    </>
  )
}