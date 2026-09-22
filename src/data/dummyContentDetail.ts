// src/data/dummyContentDetail.ts
import type { Cast, Content } from '@/features/film/film.types';
import type { ContentDetail } from '@/features/film/content-detail.types';
import type { Episode } from '@/features/series/series.types';
import placholder from '@/assets/images/placeholder/placheholder.jpeg';
import { dummyFilms } from './dummyFilm';

const contentDetailMeta: Record<string, { casts: Cast[]; creator: string }> = {
  '1': {
    casts: [
      { id: 'duty-c1', name: 'Shin Hyun-soo' },
      { id: 'duty-c2', name: 'Lee Soon-won' },
      { id: 'duty-c3', name: 'Im Se-mi' },
    ],
    creator: 'Lee Jae-gyu',
  },
  '23': {
    casts: [
      { id: 'otto-c1', name: 'Tom Hanks' },
      { id: 'otto-c2', name: 'Mariana Trevino' },
      { id: 'otto-c3', name: 'Rachel Keller' },
    ],
    creator: 'Marc Forster',
  },
  '11': {
    casts: [
      { id: 'ted-c1', name: 'Jason Sudeikis' },
      { id: 'ted-c2', name: 'Hannah Waddingham' },
      { id: 'ted-c3', name: 'Brett Goldstein' },
    ],
    creator: 'Bill Lawrence',
  },
  '8': {
    casts: [
      { id: 'aouad-c1', name: 'Park Ji-hu' },
      { id: 'aouad-c2', name: 'Yoon Chan-young' },
      { id: 'aouad-c3', name: 'Cho Yi-hyun' },
    ],
    creator: 'Lee Jae-gyu',
  },
  '22': {
    casts: [
      { id: 'mermaid-c1', name: 'Halle Bailey' },
      { id: 'mermaid-c2', name: 'Jonah Hauer-King' },
      { id: 'mermaid-c3', name: 'Melissa McCarthy' },
    ],
    creator: 'Rob Marshall',
  },
  '6': {
    casts: [
      { id: 'bluelock-c1', name: 'Kazuki Ura' },
      { id: 'bluelock-c2', name: 'Tasuku Kaito' },
      { id: 'bluelock-c3', name: 'Yuki Ono' },
    ],
    creator: 'Tetsuaki Watanabe',
  },
  '20': {
    casts: [
      { id: 'shazam-c1', name: 'Zachary Levi' },
      { id: 'shazam-c2', name: 'Asher Angel' },
      { id: 'shazam-c3', name: 'Jack Dylan Grazer' },
    ],
    creator: 'David F. Sandberg',
  },
  '21': {
    casts: [
      { id: 'avatar-c1', name: 'Sam Worthington' },
      { id: 'avatar-c2', name: 'Zoe Saldana' },
      { id: 'avatar-c3', name: 'Sigourney Weaver' },
    ],
    creator: 'James Cameron',
  },
  '24': {
    casts: [
      { id: 'bighero-c1', name: 'Ryan Potter' },
      { id: 'bighero-c2', name: 'Scott Adsit' },
      { id: 'bighero-c3', name: 'Jamie Chung' },
    ],
    creator: 'Don Hall, Chris Williams',
  },
  '25': {
    casts: [
      { id: 'strange-c1', name: 'Benedict Cumberbatch' },
      { id: 'strange-c2', name: 'Elizabeth Olsen' },
      { id: 'strange-c3', name: 'Xochitl Gomez' },
    ],
    creator: 'Sam Raimi',
  },
  '26': {
    casts: [
      { id: 'blackadam-c1', name: 'Dwayne Johnson' },
      { id: 'blackadam-c2', name: 'Aldis Hodge' },
      { id: 'blackadam-c3', name: 'Pierce Brosnan' },
    ],
    creator: 'Jaume Collet-Serra',
  },
  '27': {
    casts: [
      { id: 'jurassic-c1', name: 'Chris Pratt' },
      { id: 'jurassic-c2', name: 'Bryce Dallas Howard' },
      { id: 'jurassic-c3', name: 'Laura Dern' },
    ],
    creator: 'Colin Trevorrow',
  },
  '28': {
    casts: [
      { id: 'gotg-c1', name: 'Chris Pratt' },
      { id: 'gotg-c2', name: 'Zoe Saldana' },
      { id: 'gotg-c3', name: 'Dave Bautista' },
    ],
    creator: 'James Gunn',
  },
  '29': {
    casts: [
      { id: 'spiderverse-c1', name: 'Shameik Moore' },
      { id: 'spiderverse-c2', name: 'Hailee Steinfeld' },
      { id: 'spiderverse-c3', name: 'Oscar Isaac' },
    ],
    creator: 'Joaquim Dos Santos, Kemp Powers, Justin K. Thompson',
  },
  '9': {
    casts: [
      { id: 'alice-c1', name: 'Kento Yamazaki' },
      { id: 'alice-c2', name: 'Tao Tsuchiya' },
      { id: 'alice-c3', name: 'Nijiro Murakami' },
    ],
    creator: 'Shinsuke Sato',
  },
  '10': {
    casts: [
      { id: 'mha-c1', name: 'Daiki Yamashita' },
      { id: 'mha-c2', name: 'Kenta Miyake' },
      { id: 'mha-c3', name: 'Nobuhiko Okamoto' },
    ],
    creator: 'Kohei Horikoshi',
  },
  '12': {
    casts: [
      { id: 'baymax-c1', name: 'Scott Adsit' },
      { id: 'baymax-c2', name: 'Ryan Potter' },
      { id: 'baymax-c3', name: 'Maya Rudolph' },
    ],
    creator: 'Don Hall',
  },
  '13': {
    casts: [
      { id: 'happiness-c1', name: 'Han Hyo-joo' },
      { id: 'happiness-c2', name: 'Park Hyung-sik' },
      { id: 'happiness-c3', name: 'Jo Woo-jin' },
    ],
    creator: 'Ahn Gil-ho',
  },
  '14': {
    casts: [
      { id: 'devil-c1', name: 'Emily Deschanel' },
      { id: 'devil-c2', name: 'Madeleine Arthur' },
      { id: 'devil-c3', name: 'Sam Jaeger' },
    ],
    creator: 'Daria Polatin',
  },
  '15': {
    casts: [
      { id: 'missing-side-c1', name: 'Go Soo' },
      { id: 'missing-side-c2', name: 'Heo Jun-ho' },
    ],
    creator: 'Kim Sung-goo',
  },
  '30': {
    casts: [
      { id: 'missing-c1', name: 'Storm Reid' },
      { id: 'missing-c2', name: 'Joaquim de Almeida' },
      { id: 'missing-c3', name: 'Nia Long' },
    ],
    creator: 'Will Merrick, Nick Johnson',
  },
};

const createEpisode = (content: Extract<Content, { type: 'series' }>): Episode => ({
  id: `${content.id}-episode-1`,
  content_id: content.id,
  episode_number: 1,
  title: 'Episode 1',
  description: `Episode pembuka dari ${content.title}.`,
  thumbnail_url: placholder,
  video_url: '',
  duration: '45 min',
});

export const dummyContentDetails: ContentDetail[] = dummyFilms.map((content) => {
  const meta = contentDetailMeta[content.id];

  if (content.type === 'series') {
    return {
      ...content,
      casts: meta.casts,
      creator: meta.creator,
      episodes: [createEpisode(content)],
    };
  }

  return {
    ...content,
    casts: meta.casts,
    creator: meta.creator,
  };
});
