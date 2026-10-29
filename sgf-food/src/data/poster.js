// "From Farm to Flavour" motion poster (hero). One clip per scene in sgf-food/public/motion.
// Clips are stock footage from Pexels (free licence) until the client sends their own:
// replace a file with the same name and it plays in the same slot. Keep clips 720p, 6–9 s, no audio.
// `pos` = which part of the frame stays in view when a phone crops the landscape clip (CSS object-position).

export const POSTER = [
  { id: '01-harvest', name: 'The Beginning', text: 'Every great flavour starts somewhere.', dur: 6 },
  { id: '02-prepare', name: 'Freshness Meets Care', text: 'Carefully selected. Expertly prepared.', dur: 7 },
  { id: '03-slice', name: 'The Perfect Slice', text: 'Precision in every slice.', dur: 6, pos: '35% 50%' },
  { id: '04-fry', name: 'The Golden Transformation', text: 'Golden. Crispy. Irresistible.', dur: 8 },
  { id: '05-season', name: 'The Flavour Explosion', text: 'A world of flavour in every bite.', dur: 6.5 },
  { id: '06-pack', name: 'Sealed to Perfection', text: 'Packed for freshness. Made for sharing.', dur: 7 },
  { id: '07-brand', name: 'Sri Gopal Foods', text: 'From farm to flavour. One irresistible crunch.', dur: 9, brand: true },
].map((s) => ({ ...s, src: `/motion/${s.id}.mp4`, poster: `/motion/${s.id}.jpg` }))
