// The three kinds of chips. Colours drive every illustration (raw vegetable, peeled flesh, fried chip, pack).
// NOTE: descriptions are general — confirm wording with the client before launch.
export const CHIPS = [
  {
    id: 'potato',
    name: 'Potato',
    title: 'Potato Chips',
    raw: 'potatoes',
    desc: 'Made from fresh potatoes, sliced into thin rounds and fried golden.',
    c: { skin: '#c99a5b', skinDark: '#9c7038', flesh: '#f6e3a6', fleshDark: '#e2c77c', chip: '#f4b740', chipDark: '#d98a1c', pack: '#ff7a45', packDark: '#e2551f', tint: '#fff0dc' },
  },
  {
    id: 'banana',
    name: 'Banana',
    title: 'Banana Chips',
    raw: 'raw bananas',
    desc: 'Made from raw bananas, sliced into thin rounds and fried crisp.',
    c: { skin: '#76a640', skinDark: '#4e7a24', flesh: '#f3ead0', fleshDark: '#ddd0a6', chip: '#f7cf4a', chipDark: '#d9a21c', pack: '#3f9d4a', packDark: '#2c7a36', tint: '#eef7dc' },
  },
  {
    id: 'tapioca',
    name: 'Tapioca',
    title: 'Tapioca Chips',
    raw: 'tapioca roots',
    desc: 'Made from tapioca (maravalli kizhangu) roots, sliced thin and fried crisp.',
    c: { skin: '#8a5a3a', skinDark: '#5f3b22', flesh: '#fbf3df', fleshDark: '#c9b07a', chip: '#f1dca6', chipDark: '#c9a45e', pack: '#c4452f', packDark: '#9c301e', tint: '#f7ece2' },
  },
]

export const CHIP = Object.fromEntries(CHIPS.map((t) => [t.id, t]))

// Farm-to-pack life cycle. `text` gets the chip type, so a step can differ per type.
// NOTE: this is the standard chips process — confirm the client's actual steps before launch.
export const STEPS = [
  {
    id: 'harvest',
    label: 'Harvest',
    title: 'Fresh from the farm',
    text: (t) => `It all starts with fresh ${t.raw}, harvested and brought in from the farm.`,
  },
  {
    id: 'wash',
    label: 'Wash',
    title: 'Washed clean',
    text: (t) => `The ${t.raw} are washed in clean water to remove mud and dirt.`,
  },
  {
    id: 'peel',
    label: 'Peel',
    title: 'Peeled',
    text: (t) =>
      ({
        potato: 'The thin skin is peeled away, leaving the pale potato inside.',
        banana: 'The green skin is peeled off each raw banana.',
        tapioca: 'The thick brown skin and inner rind are peeled off the root.',
      })[t.id],
  },
  {
    id: 'slice',
    label: 'Slice',
    title: 'Sliced thin',
    text: (t) =>
      ({
        potato: 'Sliced into thin, even rounds so every chip fries the same.',
        banana: 'Sliced into thin rounds, ready for the fryer.',
        tapioca: 'Sliced into thin, long ovals, ready for the fryer.',
      })[t.id],
  },
  {
    id: 'fry',
    label: 'Fry',
    title: 'Fried golden',
    text: () => 'The slices go into hot oil and come out golden and crisp.',
  },
  {
    id: 'season',
    label: 'Season',
    title: 'Seasoned while warm',
    text: () => 'Salt and seasoning are tossed in while the chips are still warm.',
  },
  {
    id: 'check',
    label: 'Cool & check',
    title: 'Cooled and checked',
    text: () => 'The chips are cooled and checked before they are packed.',
  },
  {
    id: 'pack',
    label: 'Pack',
    title: 'Packed for the crunch',
    text: () => 'Packed and sealed to keep every chip crunchy, ready for the shop shelf.',
  },
]
