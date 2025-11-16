import { BillboardSong } from '@/data/billboardSongs';

/**
 * Plays a completely random song (not the one you clicked on)
 * because this is stupid spotify and we gaslight you
 * 
 * TODO: Actually implement this function lol
 */
export function playRandomSong(clickedSong: BillboardSong): void {
  // TODO: Implement this to play a random song
  // Make sure it's NOT the song they actually clicked
  // That's the whole point of stupid spotify fr fr
  
  console.log(`User clicked: ${clickedSong.title} by ${clickedSong.artist}`);
  console.log('TODO: Play a completely different random song instead 💀');

  // Generate a skibidi roast message
  const roastMessages = [
    `nah bruh, "${clickedSong.title}" is straight mid fr fr 💀 playing you something more bussin instead`,
    `yo that song is lowkey trash ngl, lemme cook you up something better rn no cap 🔥`,
    `"${clickedSong.title}"??? bestie that's giving flop energy, switching it up for u fr 😭`,
    `deadass that track is NOT it chief, i gotchu with the real vibes instead 💯`,
    `${clickedSong.artist} kinda mid today ngl, playing you actual heat instead bestie ✨`,
    `bruh moment... that song is cooked fr, lemme fix your taste real quick 🫡`,
    `respectfully, that's a skip for me dawg. playing you peak music instead no cap 🎵`,
    `ong that song got 0 rizz, switching to something more sigma fr 🗿`,
    `nah fam "${clickedSong.title}" ain't hitting rn, i got something way more fire trust 🔥`,
    `bestie... that's a L take. playing you certified bops instead fr fr 💅`,
    `that song? we don't claim that in 2025 💀 playing you actual culture instead`,
    `yikes... "${clickedSong.artist}" went hard but not on that one chief, lemme cook 👨‍🍳`,
    `bro picked the most mid song possible 😭 dw i got the aux now, playing heat`,
    `nahhh you buggin with that choice fr, trust the process i got you 🙏`,
    `"${clickedSong.title}" is lowkey giving cringe core, switching to peak fr 📈`,
  ];

  const randomMessage = roastMessages[Math.floor(Math.random() * roastMessages.length)];
  
  // Trigger bot message using custom event
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('bot-message', { detail: randomMessage }));
  }
}
