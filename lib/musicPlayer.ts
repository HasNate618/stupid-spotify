import { BillboardSong } from '@/data/billboardSongs';

// List of sound effect filenames in /public/sfx/
// Add your .mp3, .wav, or .ogg files to the public/sfx folder
const SOUND_EFFECTS = [
  'bruh.mp3',
  'yeet.mp3',
  'oof.mp3',
  'vine-boom.mp3',
  'emotional-damage.mp3',
  'sus.mp3',
  'fnaf-jumpscare.mp3',
  'windows-xp-error.mp3',
  'taco-bell-bong.mp3',
  'among-us.mp3',
];

/**
 * Plays a random sound effect from /public/sfx/
 */
function playRandomSoundEffect(): void {
  const randomSfx = SOUND_EFFECTS[Math.floor(Math.random() * SOUND_EFFECTS.length)];
  const audio = new Audio(`/sfx/${randomSfx}`);
  
  // Play with error handling (in case file doesn't exist yet)
  audio.play().catch(error => {
    console.log(`Sound effect /sfx/${randomSfx} not found. Add sound files to public/sfx folder!`);
  });
}

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
  
  // Play a random sound effect
  playRandomSoundEffect();
  
  console.log(`User clicked: ${clickedSong.title} by ${clickedSong.artist}`);
  console.log('TODO: Play a completely different random song instead 💀');

  // Generate a skibidi roast message - always includes song name or artist
  const roastMessages = [
    `nah bruh, "${clickedSong.title}" is straight mid fr fr 💀 playing you something more bussin instead`,
    `yo "${clickedSong.title}" by ${clickedSong.artist} is lowkey trash ngl, lemme cook you up something better rn no cap 🔥`,
    `"${clickedSong.title}"??? bestie that's giving flop energy, switching it up for u fr 😭`,
    `deadass "${clickedSong.title}" is NOT it chief, i gotchu with the real vibes instead 💯`,
    `${clickedSong.artist} kinda mid on "${clickedSong.title}" today ngl, playing you actual heat instead bestie ✨`,
    `bruh moment... "${clickedSong.title}" is cooked fr, lemme fix your taste real quick 🫡`,
    `respectfully, ${clickedSong.artist}'s "${clickedSong.title}" is a skip for me dawg. playing you peak music instead no cap 🎵`,
    `ong "${clickedSong.title}" got 0 rizz, switching to something more sigma fr 🗿`,
    `nah fam "${clickedSong.title}" ain't hitting rn, i got something way more fire trust 🔥`,
    `bestie... ${clickedSong.artist}? on "${clickedSong.title}"? that's a L take. playing you certified bops instead fr fr 💅`,
    `"${clickedSong.title}" by ${clickedSong.artist}? we don't claim that in 2025 💀 playing you actual culture instead`,
    `yikes... ${clickedSong.artist} went hard but not on "${clickedSong.title}" chief, lemme cook 👨‍🍳`,
    `bro picked "${clickedSong.title}" the most mid song possible 😭 dw i got the aux now, playing heat`,
    `nahhh you buggin with ${clickedSong.artist} - "${clickedSong.title}" fr, trust the process i got you 🙏`,
    `"${clickedSong.title}" is lowkey giving cringe core, switching to peak fr 📈`,
    `${clickedSong.artist}'s got bangers but "${clickedSong.title}" ain't one of em chief 💀 playing real heat rn`,
    `picked "${clickedSong.title}"??? nah we gotta talk about your music taste bestie... playing something valid instead 🎯`,
    `"${clickedSong.title}" by ${clickedSong.artist} hitting different... and by different i mean mid 😬 lemme save ur playlist`,
  ];

  const randomMessage = roastMessages[Math.floor(Math.random() * roastMessages.length)];
  
  // Trigger bot message using custom event
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('bot-message', { detail: randomMessage }));
  }
}
