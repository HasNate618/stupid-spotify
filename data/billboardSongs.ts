// Billboard Hot 100 Top 50 Songs
export interface BillboardSong {
  id: string;
  rank: number;
  title: string;
  artist: string;
  image: string;
  audioUrl: string;
}

export const billboardTop50: BillboardSong[] = [
  {
    "id": "1",
    "rank": 1,
    "title": "The Fate Of Ophelia",
    "artist": "Taylor Swift",
    "image": "/billboard/taylor-swift-vug-180x180.jpg",
    "audioUrl": "https://example.com/audio/1.mp3"
  },
  {
    "id": "2",
    "rank": 2,
    "title": "Golden",
    "artist": "Unknown",
    "image": "/billboard/huntrxejaeaudreynunareiami-o2t-golden-ozh-180x180.jpg",
    "audioUrl": "https://example.com/audio/2.mp3"
  },
  {
    "id": "3",
    "rank": 3,
    "title": "Ordinary",
    "artist": "Alex Warren",
    "image": "/billboard/alexwarren-vcb-ordinary-jb8-180x180.jpg",
    "audioUrl": "https://example.com/audio/3.mp3"
  },
  {
    "id": "4",
    "rank": 4,
    "title": "Opalite",
    "artist": "Taylor Swift",
    "image": "/billboard/taylor-swift-vug-180x180.jpg",
    "audioUrl": "https://example.com/audio/4.mp3"
  },
  {
    "id": "5",
    "rank": 5,
    "title": "Man I Need",
    "artist": "Unknown",
    "image": "/billboard/oliviadean-lxn-manineed-jej-180x180.jpg",
    "audioUrl": "https://example.com/audio/5.mp3"
  },
  {
    "id": "6",
    "rank": 6,
    "title": "Daisies",
    "artist": "Justin Bieber",
    "image": "/billboard/justin-bieber-dj8-180x180.jpg",
    "audioUrl": "https://example.com/audio/6.mp3"
  },
  {
    "id": "7",
    "rank": 7,
    "title": "Folded",
    "artist": "Kehlani",
    "image": "/billboard/kehlani-48p-folded-beh-180x180.jpg",
    "audioUrl": "https://example.com/audio/7.mp3"
  },
  {
    "id": "8",
    "rank": 8,
    "title": "Mutt",
    "artist": "Unknown",
    "image": "/billboard/leonthomas-y3w-mutt-ch5-180x180.jpg",
    "audioUrl": "https://example.com/audio/8.mp3"
  },
  {
    "id": "9",
    "rank": 9,
    "title": "I Got Better",
    "artist": "Morgan Wallen",
    "image": "/billboard/morgan-wallen-eos-igotbetter-8s9-180x180.jpg",
    "audioUrl": "https://example.com/audio/9.mp3"
  },
  {
    "id": "10",
    "rank": 10,
    "title": "Thriller",
    "artist": "Unknown",
    "image": "/billboard/michael-jackson-y4h-thriller-kni-180x180.jpg",
    "audioUrl": "https://example.com/audio/10.mp3"
  },
  {
    "id": "11",
    "rank": 11,
    "title": "Back To Friends",
    "artist": "sombr",
    "image": "/billboard/sombr-kpn-backtofriends-xkb-180x180.jpg",
    "audioUrl": "https://example.com/audio/11.mp3"
  },
  {
    "id": "12",
    "rank": 12,
    "title": "Soda Pop",
    "artist": "Unknown",
    "image": "/billboard/sajaboysandrewchoineckwavdannychungkevinwoosamuillee-bpl-sodapop-81d-180x180.jpg",
    "audioUrl": "https://example.com/audio/12.mp3"
  },
  {
    "id": "13",
    "rank": 13,
    "title": "Elizabeth Taylor",
    "artist": "Taylor Swift",
    "image": "/billboard/taylor-swift-vug-180x180.jpg",
    "audioUrl": "https://example.com/audio/13.mp3"
  },
  {
    "id": "14",
    "rank": 14,
    "title": "Your Idol",
    "artist": "Unknown",
    "image": "/billboard/sajaboysandrewchoineckwavdannychungkevinwoosamuillee-bpl-youridol-tim-180x180.jpg",
    "audioUrl": "https://example.com/audio/14.mp3"
  },
  {
    "id": "15",
    "rank": 15,
    "title": "What I Want",
    "artist": "Morgan Wallen",
    "image": "/billboard/morgan-wallen-eos-180x180.jpg",
    "audioUrl": "https://example.com/audio/15.mp3"
  },
  {
    "id": "16",
    "rank": 16,
    "title": "It Depends",
    "artist": "Chris Brown",
    "image": "/billboard/chris-brown-t69-itdepends-6sf-180x180.jpg",
    "audioUrl": "https://example.com/audio/16.mp3"
  },
  {
    "id": "17",
    "rank": 17,
    "title": "Tears",
    "artist": "Sabrina Carpenter",
    "image": "/billboard/sabrina-carpenter-l0r-180x180.jpg",
    "audioUrl": "https://example.com/audio/17.mp3"
  },
  {
    "id": "18",
    "rank": 18,
    "title": "Manchild",
    "artist": "Sabrina Carpenter",
    "image": "/billboard/sabrina-carpenter-l0r-manchild-cmz-180x180.jpg",
    "audioUrl": "https://example.com/audio/18.mp3"
  },
  {
    "id": "19",
    "rank": 19,
    "title": "Love Me Not",
    "artist": "Unknown",
    "image": "/billboard/ravynlenae-qqs-lovemenot-et7-180x180.jpg",
    "audioUrl": "https://example.com/audio/19.mp3"
  },
  {
    "id": "20",
    "rank": 20,
    "title": "Father Figure",
    "artist": "Taylor Swift",
    "image": "/billboard/taylor-swift-vug-180x180.jpg",
    "audioUrl": "https://example.com/audio/20.mp3"
  },
  {
    "id": "21",
    "rank": 21,
    "title": "Monster Mash",
    "artist": "Unknown",
    "image": "/billboard/bobby-boris-pickett-and-the-crypt-kickers-000-monstermash-mjg-180x180.jpg",
    "audioUrl": "https://example.com/audio/21.mp3"
  },
  {
    "id": "22",
    "rank": 22,
    "title": "Ghostbusters",
    "artist": "Unknown",
    "image": "/billboard/ray-parker-jr-000-ghostbusters-b4m-180x180.jpg",
    "audioUrl": "https://example.com/audio/22.mp3"
  },
  {
    "id": "23",
    "rank": 23,
    "title": "How It's Done",
    "artist": "Unknown",
    "image": "/billboard/huntrxejaeaudreynunareiami-o2t-howitsdone-3mh-180x180.jpg",
    "audioUrl": "https://example.com/audio/23.mp3"
  },
  {
    "id": "24",
    "rank": 24,
    "title": "Somebody's Watching Me",
    "artist": "Rockwell",
    "image": "/billboard/rockwell-000-somebodyswatchingme-kxm-180x180.jpg",
    "audioUrl": "https://example.com/audio/24.mp3"
  },
  {
    "id": "25",
    "rank": 25,
    "title": "Choosin' Texas",
    "artist": "Unknown",
    "image": "/billboard/ellalangley-j32-180x180.jpg",
    "audioUrl": "https://example.com/audio/25.mp3"
  },
  {
    "id": "26",
    "rank": 26,
    "title": "This Is Halloween",
    "artist": "Unknown",
    "image": "/billboard/lazyload-fallback.gif",
    "audioUrl": "https://example.com/audio/26.mp3"
  },
  {
    "id": "27",
    "rank": 27,
    "title": "Tit For Tat",
    "artist": "Tate McRae",
    "image": "/billboard/tatemcrae-vd8-180x180.jpg",
    "audioUrl": "https://example.com/audio/27.mp3"
  },
  {
    "id": "28",
    "rank": 28,
    "title": "Wi$h Li$t",
    "artist": "Taylor Swift",
    "image": "/billboard/taylor-swift-vug-180x180.jpg",
    "audioUrl": "https://example.com/audio/28.mp3"
  },
  {
    "id": "29",
    "rank": 29,
    "title": "What It Sounds Like",
    "artist": "Unknown",
    "image": "/billboard/huntrxejaeaudreynunareiami-o2t-whatitsoundslike-hu2-180x180.jpg",
    "audioUrl": "https://example.com/audio/29.mp3"
  },
  {
    "id": "30",
    "rank": 30,
    "title": "Dracula",
    "artist": "Tame Impala",
    "image": "/billboard/tame-impala-nyr-180x180.jpg",
    "audioUrl": "https://example.com/audio/30.mp3"
  },
  {
    "id": "31",
    "rank": 31,
    "title": "All I Want For Christmas Is You",
    "artist": "Mariah Carey",
    "image": "/billboard/mariah-carey-qmg-alliwantforchristmasisyou-7ve-180x180.jpg",
    "audioUrl": "https://example.com/audio/31.mp3"
  },
  {
    "id": "32",
    "rank": 32,
    "title": "The Life Of A Showgirl",
    "artist": "Taylor Swift",
    "image": "/billboard/taylor-swift-vug-180x180.jpg",
    "audioUrl": "https://example.com/audio/32.mp3"
  },
  {
    "id": "33",
    "rank": 33,
    "title": "Gabriela",
    "artist": "KATSEYE",
    "image": "/billboard/katseye-xrz-gabriela-iea-180x180.jpg",
    "audioUrl": "https://example.com/audio/33.mp3"
  },
  {
    "id": "34",
    "rank": 34,
    "title": "Happen To Me",
    "artist": "Russell Dickerson",
    "image": "/billboard/russell-dickerson-aem-happentome-tcj-180x180.jpg",
    "audioUrl": "https://example.com/audio/34.mp3"
  },
  {
    "id": "35",
    "rank": 35,
    "title": "Takedown",
    "artist": "Unknown",
    "image": "/billboard/huntrxejaeaudreynunareiami-o2t-180x180.jpg",
    "audioUrl": "https://example.com/audio/35.mp3"
  },
  {
    "id": "36",
    "rank": 36,
    "title": "No Broke Boys",
    "artist": "Tinashe",
    "image": "/billboard/discolines-hzk-nobrokeboys-gbu-180x180.jpg",
    "audioUrl": "https://example.com/audio/36.mp3"
  },
  {
    "id": "37",
    "rank": 37,
    "title": "Wood",
    "artist": "Taylor Swift",
    "image": "/billboard/taylor-swift-vug-180x180.jpg",
    "audioUrl": "https://example.com/audio/37.mp3"
  },
  {
    "id": "38",
    "rank": 38,
    "title": "Actually Romantic",
    "artist": "Taylor Swift",
    "image": "/billboard/taylor-swift-vug-180x180.jpg",
    "audioUrl": "https://example.com/audio/38.mp3"
  },
  {
    "id": "39",
    "rank": 39,
    "title": "Free",
    "artist": "Unknown",
    "image": "/billboard/lazyload-fallback.gif",
    "audioUrl": "https://example.com/audio/39.mp3"
  },
  {
    "id": "40",
    "rank": 40,
    "title": "Back In The Saddle",
    "artist": "Luke Combs",
    "image": "/billboard/luke-combs-vjy-backinthesaddle-8bn-180x180.jpg",
    "audioUrl": "https://example.com/audio/40.mp3"
  },
  {
    "id": "41",
    "rank": 41,
    "title": "Cancelled!",
    "artist": "Taylor Swift",
    "image": "/billboard/taylor-swift-vug-180x180.jpg",
    "audioUrl": "https://example.com/audio/41.mp3"
  },
  {
    "id": "42",
    "rank": 42,
    "title": "6 Months Later",
    "artist": "Megan Moroney",
    "image": "/billboard/meganmoroney-1wq-6monthslater-74i-180x180.jpg",
    "audioUrl": "https://example.com/audio/42.mp3"
  },
  {
    "id": "43",
    "rank": 43,
    "title": "Last Christmas",
    "artist": "Unknown",
    "image": "/billboard/wham-pyz-lastchristmas-xhm-180x180.jpg",
    "audioUrl": "https://example.com/audio/43.mp3"
  },
  {
    "id": "44",
    "rank": 44,
    "title": "Don't Mind If I Do",
    "artist": "Riley Green",
    "image": "/billboard/riley-green-flo-dontmindifido-5mc-180x180.jpg",
    "audioUrl": "https://example.com/audio/44.mp3"
  },
  {
    "id": "45",
    "rank": 45,
    "title": "Yukon",
    "artist": "Justin Bieber",
    "image": "/billboard/justin-bieber-dj8-180x180.jpg",
    "audioUrl": "https://example.com/audio/45.mp3"
  },
  {
    "id": "46",
    "rank": 46,
    "title": "So Easy (To Fall In Love)",
    "artist": "Unknown",
    "image": "/billboard/oliviadean-8k4-180x180.jpg",
    "audioUrl": "https://example.com/audio/46.mp3"
  },
  {
    "id": "47",
    "rank": 47,
    "title": "Shot Callin",
    "artist": "YoungBoy Never Broke Again",
    "image": "/billboard/youngboy-never-broke-again-7nh-shotcallin-a7o-180x180.jpg",
    "audioUrl": "https://example.com/audio/47.mp3"
  },
  {
    "id": "48",
    "rank": 48,
    "title": "Somewhere Over Laredo",
    "artist": "Lainey Wilson",
    "image": "/billboard/lainey-wilson-wci-somewhereoverlaredo-3ei-180x180.jpg",
    "audioUrl": "https://example.com/audio/48.mp3"
  },
  {
    "id": "49",
    "rank": 49,
    "title": "Eldest Daughter",
    "artist": "Taylor Swift",
    "image": "/billboard/taylor-swift-vug-180x180.jpg",
    "audioUrl": "https://example.com/audio/49.mp3"
  },
  {
    "id": "50",
    "rank": 50,
    "title": "wgft",
    "artist": "Gunna",
    "image": "/billboard/gunna-t8f-180x180.jpg",
    "audioUrl": "https://example.com/audio/50.mp3"
  }
];
