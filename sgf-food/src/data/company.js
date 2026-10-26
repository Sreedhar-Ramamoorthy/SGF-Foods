export const GROUP_URL = import.meta.env.VITE_GROUP_URL || 'http://localhost:5173'
export const GROUP_NAME = 'Sri Gopal Group'

export const COMPANY = {
  name: 'Sri Gopal Foods',
  // Tagline from the company letterhead
  tagline: 'Taste the Happiness',
  // Hero video: put the client's video in sgf-food/public (e.g. hero.mp4) and set heroVideo: '/hero.mp4'.
  // While empty, the hero plays an animated montage of the chips life cycle instead.
  heroVideo: '',
  heroPoster: '', // optional still image shown while the video loads, e.g. '/hero.jpg'
  address: ['No: 8/1169, Alagu Nagar, Poonampalayam', 'Manachanallur Tk, Manachanallur Block', 'Tiruchirappalli, Tamil Nadu – 621009'],
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Alagu Nagar, Poonampalayam, Manachanallur, Tiruchirappalli, Tamil Nadu 621009'),
}

// Ids match the sections on the group landing page (used for deep links back to it).
export const GROUP_BUSINESSES = [
  { id: 'transport', name: 'Sri Gopal Transports', color: '#3fa9ff' },
  { id: 'farms', name: 'Sri Gopal Farms', color: '#7bd34f' },
  { id: 'investments', name: 'Sri Gopal Investments', color: '#ffc933' },
  { id: 'food', name: 'Sri Gopal Foods', color: '#ff7a45' },
  { id: 'realestate', name: 'Sri Gopal Real Estates', color: '#b98bff' },
]
