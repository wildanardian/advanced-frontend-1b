import HeroBanner from '@/features/home/components/HeroBanner';

import filmHeroBanner from '@/assets/images/hero/hero-film-section-banner.png';
import { Carousel } from '@/components/ui/Carousel';
import FilmCard from '@/components/ui/FilmCard';
// import { dummyFilms } from '@/data/dummyFilm';
import ContinueWatchingCard from '../home/components/ContinueWatchingCard';
import { dummyContinueWatching } from '@/data/dummyContinueWatch';
import { useFilms } from '@/hooks/use-films';

export default function Film() {
  const { films, isLoading, error } = useFilms();

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <>
      <HeroBanner
        title="Avatar 3"
        synopsis="'Avatar 3' melanjutkan cerita konflik antara manusia dan Na'vi di planet Pandora. Dalam pertempuran untuk sumber daya dan kekuasaan, manusia dan sekutu Na'vi bersatu untuk melindungi tanah mereka. Film ini mengangkat tema persatuan dan perlawanan terhadap eksploitasi."
        bannerUrl={filmHeroBanner}
        ageRating="18+"
        onPlay={() => console.log('Play button clicked')}
        onMoreInfo={() => console.log('More Info button clicked')}
      />

      <div className="p-5 lg:p-20 space-y-10">
        <Carousel
          title="Melanjutkan Tonton Film"
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
          title="Film Persembahan Chill"
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