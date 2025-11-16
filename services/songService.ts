import { Song } from '@/hooks/useAudioPlayer';

const BAD_SONGS: Song[] = [
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
  }
];

export const songService = {
  getAllSongs: async (): Promise<Song[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(BAD_SONGS), 100);
    });
  },

  getSongById: async (id: string): Promise<Song | undefined> => {
    return BAD_SONGS.find(song => song.id === id);
  },

  searchSongs: async (query: string): Promise<Song[]> => {
    return BAD_SONGS.filter(song => 
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase())
    );
  }
};
