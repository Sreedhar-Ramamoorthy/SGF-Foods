export const FOOD_URL = import.meta.env.VITE_FOOD_URL || 'http://localhost:5174'

export const GROUP = {
  name: 'Sri Gopal Group',
  short: 'Sri Gopal',
  mark: 'SG',
  // Registered address of Sri Gopal Foods — replace if the group has a separate head office.
  address: ['No: 8/1169, Alagu Nagar, Poonampalayam', 'Manachanallur Tk, Tiruchirappalli', 'Tamil Nadu – 621009'],
}

// Order as given by the client. Add a business here and the navbar, orbit, cards and panels all update.
export const BUSINESSES = [
  {
    id: 'transport',
    name: 'Transports',
    brand: 'Sri Gopal Transports',
    color: '#3fa9ff',
    icon: 'transport',
    word: 'highways',
    tagline: 'Reliable goods transport across Tamil Nadu and beyond.',
    desc: 'Lorry and fleet services for freight, farm produce and last-mile delivery.',
    features: ['Own fleet of goods vehicles', 'Live GPS tracking', 'Safe, on-time deliveries'],
    stat: ['24/7', 'dispatch support'],
  },
  {
    id: 'farms',
    name: 'Farms',
    brand: 'Sri Gopal Farms',
    color: '#7bd34f',
    icon: 'farm',
    word: 'harvests',
    tagline: 'Fresh produce, grown with care on our own land.',
    desc: 'Farm-fresh produce and sustainable agriculture from the Cauvery belt.',
    features: ['Natural farming practices', 'Part of the Sri Gopal Group family', 'Fresh seasonal produce'],
    stat: ['100%', 'farm fresh'],
  },
  {
    id: 'investments',
    name: 'Investments',
    brand: 'Sri Gopal Investments',
    color: '#ffc933',
    icon: 'invest',
    word: 'futures',
    tagline: 'Helping families grow and protect their wealth.',
    desc: 'Investment planning and financial services built on trust and transparency.',
    features: ['Personalised investment planning', 'Transparent, trusted advice', 'Long-term wealth growth'],
    stat: ['1 : 1', 'personal advisory'],
  },
  {
    id: 'food',
    name: 'Foods',
    brand: 'Sri Gopal Foods',
    color: '#38b6f5',
    icon: 'food',
    word: 'snacks',
    tagline: 'Potato, banana and tapioca chips, made in Trichy.',
    desc: 'Chips maker in Manachanallur, Tiruchirappalli — potato, banana and tapioca chips.',
    features: ['Potato, banana and tapioca chips', 'Made in Manachanallur, Trichy', 'See every step from farm to pack'],
    stat: ['3', 'kinds of chips'],
    url: FOOD_URL,
  },
  {
    id: 'realestate',
    name: 'Real Estates',
    brand: 'Sri Gopal Real Estates',
    color: '#b98bff',
    icon: 'realty',
    word: 'homes',
    tagline: 'Plots, homes and spaces built on trust.',
    desc: 'Residential plots, homes and commercial spaces in and around Tiruchirappalli.',
    features: ['Clear-title properties', 'Prime locations around Trichy', 'End-to-end buying support'],
    stat: ['Trichy', 'prime locations'],
  },
]

export const byId = Object.fromEntries(BUSINESSES.map((b) => [b.id, b]))

const WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']
export const COUNT_WORD = WORDS[BUSINESSES.length] ?? String(BUSINESSES.length)
