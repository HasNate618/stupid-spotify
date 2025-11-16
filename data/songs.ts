export interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
  cover?: string;
}

export const badSongs: Song[] = [
  {
    id: '1',
    title: 'Friday',
    artist: 'Rebecca Black',
    url: '/audio/song1.mp3',
    cover: '/covers/song1.jpg'
  },
  {
    id: '2',
    title: 'Baby Shark',
    artist: 'Pinkfong',
    url: '/audio/song2.mp3',
    cover: '/covers/song2.jpg'
  },
  {
    id: '3',
    title: 'Crazy Frog',
    artist: 'Axel F',
    url: '/audio/song3.mp3',
    cover: '/covers/song3.jpg'
  },
  {
    id: '4',
    title: 'Gangnam Style (10 Hour Version)',
    artist: 'PSY',
    url: '/audio/song4.mp3',
    cover: '/covers/song4.jpg'
  },
  {
    id: '5',
    title: 'Nyan Cat',
    artist: 'daniwell',
    url: '/audio/song5.mp3',
    cover: '/covers/song5.jpg'
  }
];
