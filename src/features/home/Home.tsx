import HeroBanner from '@/features/home/components/HeroBanner';

import homeHeroBanner from '@/assets/images/hero/hero-section-banner.png';
import { Carousel } from '@/components/ui/Carousel';
import FilmCard from '@/components/ui/FilmCard';
// import { dummyFilms } from '@/data/dummyFilm';
import ContinueWatchingCard from './components/ContinueWatchingCard';
import { dummyContinueWatching } from '@/data/dummyContinueWatch';
import { useFilms } from '@/hooks/use-films';
import Loading from '@/components/ui/Loading';

export default function Home() {
  const { films, isLoading, error } = useFilms();

  if (isLoading) return <Loading />
  if (error) return <p>Error: {error}</p>

  return (
    <>
      <HeroBanner
        title="Duty After Schools"
        synopsis="Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan, Departemen Pertahanan mulai merekrut lebih banyak tentara, termasuk siswa sekolah menengah. Mereka pun segera menjadi pejuang garis depan dalam perang."
        bannerUrl={homeHeroBanner}
        ageRating="18+"
        onPlay={() => console.log('Play button clicked')}
        onMoreInfo={() => console.log('More Info button clicked')}
      />

      <div className="p-5 lg:p-20 space-y-10">
        <Carousel
          title="Top Rating Film dan Series Hari ini"
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
          items={films}
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