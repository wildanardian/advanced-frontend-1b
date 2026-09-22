import type { Content } from "@/features/film/film.types";

export const dummyFilms: Content[] = [
  {
    id: '1',
    title: 'Duty After School',
    slug: 'duty-after-school',
    type: 'series',
    synopsis:
      'Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan, Departemen Pertahanan mulai merekrut lebih banyak tentara, termasuk siswa sekolah menengah. Mereka pun segera menjadi pejuang garis depan dalam perang.',
    poster_url: '/src/assets/images/posters/duty-after-school.png',
    banner_url: '/src/assets/images/banners/duty-after-school.jpeg',
    age_rating: '18+',
    release_year: 2023,
    episode_count: 12,
    is_trending: false,
    genres: ['Misteri', 'Kriminal', 'Fantasi'],
    rating: 4.3,
  },
];